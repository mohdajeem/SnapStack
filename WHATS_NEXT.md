# What's Next (Roadmap)

This file lists current limitations discovered in the codebase and proposed future improvements.

## Current Limitations

- No automated tests or CI are present.
- No refresh-token flow or session invalidation; JWTs are single-token based.
- No rate limiting or usage quotas for the AI endpoint.
- No comprehensive error tracing or metrics instrumentation (e.g., no traces, no request timing logs).

## Short-term Improvements

- Add unit tests for controllers and services (Jest + supertest for routes).
- Add request timing and retries for AI calls in `GeminiController`.
- Add refresh token flow and token revocation for better security.
- Add rate limiting (e.g., `express-rate-limit`) and per-user quotas for AI usage.

## Medium-term Improvements

- Add a CI pipeline to run tests and build frontend automatically.
- Add role-based access control if multi-user collaboration is needed.
- Add analytics and telemetry (API latency, error rates).

## Long-term Improvements

- Support multi-file component generation and more advanced project scaffolding.
- Add export options (zip download with multiple files, direct GitHub integration).
