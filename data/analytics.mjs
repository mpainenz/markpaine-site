import { site } from './site.mjs';

const TRACKER_PATH = '/analytics/script.js';
export const analyticsHosts = Object.freeze([site.domain, `www.${site.domain}`]);

/**
 * Analytics is compiled into static output only for configured production
 * builds. The website ID identifies a public Umami property; it is not a
 * credential.
 *
 * @param {NodeJS.ProcessEnv} [env]
 */
export function getAnalyticsConfig(env = process.env) {
  const websiteId = env.NEXT_PUBLIC_UMAMI_WEBSITE_ID?.trim();

  if (env.NODE_ENV !== 'production' || !websiteId) {
    return null;
  }

  return {
    domains: analyticsHosts.join(','),
    scriptPath: TRACKER_PATH,
    websiteId,
  };
}
