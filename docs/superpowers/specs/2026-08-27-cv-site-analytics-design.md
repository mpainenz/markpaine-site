# CV site analytics and visit notifications design

Date: 2026-08-27

## Objective

Add privacy-conscious, self-hosted analytics to `markpaine.dev` and notify a
private Discord channel after a likely-human visit ends. The analytics platform
must support additional public sites later without exposing its dashboard or
administrative API to the internet.

## Scope

This work spans two repositories:

- `markpaine-site` integrates tracking, selected interaction events, the
  privacy notice and browser-level verification.
- `solus` owns the Umami, PostgreSQL, notification-worker, routing and secret
  manifests deployed to the `tortoise` k3s cluster through Argo CD.

The initial tracked site is `markpaine.dev`. The Umami installation and
notification worker are multi-site components.

## Architecture

Deploy the following components in a dedicated analytics namespace:

1. A version-pinned Umami deployment.
2. A single-instance CloudNativePG PostgreSQL cluster with persistent storage.
3. An internal notification worker maintained in `solus`.
4. A restricted public collector proxy.
5. A LAN-only authenticated Umami dashboard at a `.tortoise` hostname.

The public collector proxy exposes only the tracker asset and event-ingestion
request under a first-party `/analytics/` path. It strips the prefix and
forwards only the explicitly allowed Umami routes. All dashboard,
administrative, reporting and session API routes remain inaccessible through
the public ingress.

Each future site can route the same first-party path to the shared collector
and register a separate Umami website ID. No analytics hostname or secret is
hard-coded into the CV content.

## Tracking behavior

The production CV build loads Umami's lightweight tracker from the first-party
collector path and limits tracking to the canonical production hosts. Local
development, preview hosts and automated browser tests do not emit production
analytics.

Umami records:

- page views and visit duration;
- referrer domain and campaign parameters;
- approximate country and region;
- browser, operating system, device class, screen size and language; and
- selected interactions: CV download, email, LinkedIn, GitHub and other
  contact-link clicks.

Tracking remains cookieless and honours browser Do Not Track preferences. The
analytics path is added to the site's Content Security Policy without
weakening unrelated directives. Analytics loading or delivery failures must
not affect rendering, navigation, downloads or contact actions.

## Likely-human classification

A visit qualifies for notification when Umami accepts at least one browser
event. This uses two useful filters:

- the tracker requires JavaScript execution, excluding ordinary crawlers and
  infrastructure probes; and
- Umami's default bot detection rejects recognised bot user agents.

Configured internal source ranges, monitoring traffic, local development and
preview deployments are excluded. One-page visits still qualify. This is a
practical bot filter, not proof that every accepted visit is human; occasional
false positives are expected and must not trigger more invasive
fingerprinting.

## Visit completion and Discord notification

The internal worker runs once per minute and authenticates to Umami over the
cluster network. For each configured website it:

1. reads recent sessions from the Umami API;
2. fetches activity for candidate sessions;
3. groups activity by Umami visit ID;
4. selects visits whose newest activity is at least five minutes old;
5. skips visit IDs already recorded as notified;
6. posts one Discord embed; and
7. records the visit ID only after Discord returns success.

Grouping and deduplication use the visit ID rather than the longer-lived
visitor/session ID, allowing a returning visitor to generate a later,
independent summary.

Umami keeps a visit open for 30 minutes, but notification intentionally occurs
after a five-minute quiet period. If the visitor resumes the same visit after
the summary is sent, that later activity is omitted rather than producing an
update or duplicate message. This is an accepted trade-off for faster
notification.

The embed contains:

- tracked site and approximate start/end time;
- approximate country and region;
- referrer domain and campaign parameters;
- browser, operating system and device class;
- pages visited in chronological order;
- selected interaction events;
- approximate duration; and
- a truncated anonymous visit ID.

Raw IP addresses are neither retained by the analytics application nor sent to
Discord. The webhook URL and Umami service credentials are Kubernetes Secrets
and never enter the browser bundle, repository or application logs.

Discord failures use bounded exponential backoff. A failed visit remains
eligible for a later worker run. Permanent malformed-event failures are logged
without including visitor identifiers. Database uniqueness on website and
visit ID provides concurrency-safe deduplication.

## Access and network boundaries

The Umami dashboard and complete API are available only through the LAN
Traefik ingress and require Umami authentication. PostgreSQL and the worker
have ClusterIP-only connectivity.

The public ingress:

- accepts only `GET` for the version-pinned tracker asset;
- accepts only `POST` for event ingestion;
- rejects all other methods and paths;
- applies origin/host validation, request-size limits and rate limiting; and
- does not reveal the Umami dashboard.

The public collector is intentionally unauthenticated because browsers must be
able to submit events. Its website identifier is public by design and is not a
credential.

## Privacy notice

Add a concise `/privacy` page and a `Privacy` link in the global footer. No
cookie banner is shown because the tracker is cookieless and honours Do Not
Track.

The page will state:

> This site uses self-hosted, cookieless analytics to understand how visitors
> use it. Analytics may include pages viewed, visit duration, referring site,
> approximate country or region, browser, operating system, device type,
> campaign parameters, and interactions such as CV downloads or contact-link
> clicks.
>
> The analytics system does not retain raw IP addresses, use advertising
> identifiers, or sell information. Normal hosting and security infrastructure
> may process request metadata as part of operating the site.
>
> Anonymous visit summaries may be processed by third-party service providers
> for private operational notifications. Detailed analytics are retained for
> up to 12 months. Browser Do Not Track preferences are respected.
>
> Privacy questions can be sent through the contact details on this site.

The notice deliberately describes third-party notification processing without
naming the implementation provider.

## Retention

Self-hosted Umami retains data indefinitely by default, so a scheduled
retention task must enforce the stated 12-month limit. It removes detailed
events and associated orphaned visit/session records older than 12 months
using SQL written and tested against the pinned Umami schema version.
Aggregated, non-identifying reports may be retained longer.

Notification deduplication records expire after 13 months. Operational
application logs use the cluster's existing bounded retention and must not log
request bodies, credentials or raw analytics payloads.

## Testing and verification

### CV repository

- tracker is present only in production configuration;
- canonical hosts and website ID are configured correctly;
- Do Not Track is enabled;
- selected links emit the expected event names without blocking navigation;
- privacy page and footer link pass accessibility and responsive tests;
- Content Security Policy permits only the required analytics requests; and
- site tests succeed when the collector is unavailable.

### Infrastructure and worker

- worker unit tests cover inactivity cutoff, visit grouping, chronological
  activity, retries, successful-only deduplication and multi-site isolation;
- mocked Umami and Discord integration tests cover authentication expiry,
  pagination, malformed responses, rate limits and delivery failures;
- retention tests run against the pinned Umami database schema;
- public-route tests prove that only tracker and ingestion routes are exposed;
- LAN tests prove that the authenticated dashboard remains reachable;
- network-policy tests prove that PostgreSQL is not externally reachable; and
- an end-to-end synthetic visit produces exactly one Discord summary after the
  five-minute inactivity period.

## Rollout

1. Deploy PostgreSQL and Umami on the LAN and create the initial website.
2. Deploy the worker with Discord delivery disabled.
3. Verify dashboard access, public route restrictions and event ingestion.
4. Integrate the tracker into `markpaine-site` and deploy it.
5. Confirm bot/internal exclusions and privacy-page behavior.
6. Enable Discord delivery to a test channel and run the synthetic visit.
7. Switch to the intended private channel.
8. Observe false positives, duplicate rate and resource usage before adding
   other sites.

Rollback removes the tracker from the CV build and disables the public
collector route. Umami and its stored data can remain LAN-only while the issue
is investigated.

## Non-goals

- Identifying individual visitors.
- Retaining or reporting raw IP addresses.
- Advertising, cross-site tracking, session replay or fingerprinting.
- Making the analytics dashboard public.
- Building a custom analytics dashboard.
- Guaranteeing that every accepted event came from a human.
