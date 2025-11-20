# Features

This document summarizes the core features implemented in SnapStack based on the project code.

## Core Features

- AI Component Generation
  - Endpoint: `POST /api/v1/sessions` accepts `{ userPrompt }` to generate a complete React component (JSX) and CSS using the Gemini adapter.

- AI Component Refinement
  - Pass `sessionId` in the same endpoint (`POST /api/v1/sessions`) to refine an existing session's component using a follow-up prompt.

- Persistent Sessions
  - Sessions are stored in MongoDB as `Session` documents with `jsxCode`, `cssCode`, `chatHistory`, and `title`.

- Live Preview and Editable Editor
  - The project uses `@codesandbox/sandpack-react` to provide an in-browser live preview and code editor that edits `/App.js` and `/styles.css`.

- Authentication
  - Registration and login use `POST /api/v1/auth/register` and `POST /api/v1/auth/login`. JWT is issued on successful auth and validated by `authMiddleware`.

## Why these features matter

- Rapid Prototyping: turning a prompt into a working component dramatically reduces boilerplate.
- Iterative Refinement: users can improve a component with further prompts rather than re-creating it.
- Persistent Workflows: storing sessions lets users return to previous work and continue iterating.

## Trade-offs & Design Decisions

- Serverless-ready: The backend is compatible with serverless deployment (exports `handler`) which is good for scaling bursts but may add cold-start latency.
- Single-component output: The GeminiAdapter strictly requires that generated component is named `App` and self-contained. This simplifies sandboxing but may limit more complex multi-file component generation.
- Security: JWT with an environment-held secret is used. No refresh tokens or Device/session controls are implemented — simplicity prioritized for the hackathon scope.
