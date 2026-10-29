# AI Portfolio CV Design

## Goal

Reframe Solus Designs as an independent AI systems company and present
TensorRelay and Octopus Trader as substantial, technically distinct AI
products. The public CV should remain broadly useful while strengthening
applications for Buildkite's engineering and machine-learning roles.

## Solus Designs Description

Use:

> Solus Designs is my independent AI systems company, building production
> machine-learning software and distributed LLM inference infrastructure.

## TensorRelay

Replace the existing single-line summary with two bullets:

- Designed and built TensorRelay, a Steam-distributed LLM inference platform
  using pipeline parallelism across heterogeneous consumer GPUs, with a Go
  control plane, custom Rust runtime, C++/llama.cpp stage execution and Steam
  P2P transport.
- Implemented dynamic model-layer sharding, cluster scheduling and admission
  control, model artifact distribution and an OpenAI-compatible API; deployed
  the private-beta backend to Kubernetes through GitHub Actions and Argo CD.

These claims describe implemented capabilities while identifying the product
honestly as a private beta rather than a generally available production
service.

## Octopus Trader

Replace the existing trading-system summary with two bullets:

- Built and operated Octopus Trader, a live Python and Interactive Brokers
  trading system with a custom backtesting engine, production risk controls and
  feature engineering across 12,000+ historical trades spanning 2005–2023.
- Built and operated a repeatable MLOps workflow covering feature engineering
  across multi-year market datasets, construction of training, validation and
  forward-test sets, linear-regression experimentation, ensemble model training
  and cross-validation, inference serving, periodic retraining, and controlled
  promotion into live trading.

The wording must not imply automated retraining or overstate dataset size.
Specific libraries and model implementations remain out of the public CV.

## Skills

Rename `AI / Data` to `AI / ML` and use:

`Linear regression · MLOps · Model serving · LangGraph · MCP · Distributed LLM inference`

Python remains prominent in the Languages group. Existing Kubernetes, cloud,
CI/CD, observability and database groups remain unchanged.

## Scope

- Update the central CV data in `data/cv.ts`.
- Preserve the existing Solus Designs role title and dates.
- Do not create a Buildkite-specific CV variant.
- Do not change other employment entries or site identity content.
- Make only necessary print-layout adjustments if the expanded content causes
  clipping or an avoidable page break.

## Verification

- Run the repository's full verification command.
- Render and validate the generated CV PDF.
- Confirm the Solus Designs section remains readable on the website and in
  print.
- Confirm the PDF contains the new TensorRelay, Octopus Trader and AI/ML terms.
- Confirm the claims remain consistent with the two project repositories.
