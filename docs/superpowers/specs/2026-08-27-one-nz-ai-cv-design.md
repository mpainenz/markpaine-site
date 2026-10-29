# One NZ AI CV revision design

Date: 2026-08-27

## Objective

Improve the general-purpose CV's alignment with One New Zealand's Senior AI &
Data Solution Engineer role while keeping every addition concise, defensible
and useful for other senior engineering applications.

## Scope

Only `data/cv.ts` will change. The revision will:

- clarify the international and contractual nature of the House of Doge role;
- surface ConnectRPC and Protocol Buffers experience;
- surface practical retrieval-augmented generation and vector-database
  experience; and
- preserve the existing three-page PDF.

The CV will not name Gitopedia, add another Solus Designs project bullet or
claim a specific ConnectRPC schema-design achievement.

## House of Doge positioning

Change the role metadata from:

> Remote · 2025 —

to:

> Remote contractor from Auckland · 2025 —

Revise the company description to identify House of Doge as a
Texas-headquartered cryptocurrency startup. The wording must not imply that
Mark is based in Texas.

No new ConnectRPC or Protocol Buffers experience bullet will be added to the
role. Those technologies will be represented in the skills section.

## Skills changes

Add a new skills group:

> APIs & Integration — REST · ConnectRPC · Protocol Buffers

Expand the existing AI / ML group with:

> RAG · Embeddings · Vector databases (Qdrant)

Retain the existing AI / ML capabilities:

> Linear regression · MLOps · Model serving · LangGraph · MCP · Distributed
> LLM inference

OpenAI-compatible APIs will not appear in the new APIs & Integration group.

## Evidence and positioning

The RAG and Qdrant skills are supported by a working end-to-end Gitopedia
knowledge-retrieval path that embedded documents, retrieved relevant content
from Qdrant and supplied it to an LLM. Gitopedia remains unnamed on the CV so
the skills can be discussed in an interview without displacing the stronger
TensorRelay and Octopus Trader examples.

ConnectRPC and Protocol Buffers are listed as skills based on their use as a
consumer at House of Doge. The CV will not state that production schemas,
clients or handlers were designed there.

## Verification

Run the repository's standard verification command after implementation. Check
the generated PDF to confirm:

- it remains three pages;
- the House of Doge metadata and Texas headquarters wording render correctly;
- the new skills remain legible and do not overflow; and
- existing CV content and ordering remain intact.
