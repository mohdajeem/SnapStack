# Testing Guide

This guide explains how to manually test the backend and frontend endpoints locally. The repository does not include automated test suites.

## Start services

1. Start MongoDB (local or ensure Atlas is reachable).
2. Start the backend:

```powershell
cd Server
npm install
npm run dev
```

3. Start the frontend:

```powershell
cd client
npm install
npm run dev
```

The frontend will typically be available at `http://localhost:5173` and will proxy API calls to the local backend at `/api/v1`.

## Manual API tests (Postman / curl)

1) Register a user

POST `http://localhost:5000/api/v1/auth/register`

Body (JSON):

```json
{
  "username": "alice",
  "email": "alice@example.com",
  "password": "password123"
}
```

Expected: 201 created, response contains `token` and `user`.

2) Login

POST `http://localhost:5000/api/v1/auth/login`

Body (JSON):

```json
{
  "email": "alice@example.com",
  "password": "password123"
}
```

Expected: 200 OK, response contains `token` and `user`.

3) Verify token / Get current user

GET `http://localhost:5000/api/v1/auth/me`

Headers: `Authorization: Bearer <token>`

Expected: 200 OK with user data.

4) Create a new session (AI generate)

POST `http://localhost:5000/api/v1/sessions`

Headers: `Authorization: Bearer <token>`

Body (JSON):

```json
{
  "userPrompt": "A login form with email, password and a blue submit button"
}
```

Expected: 200 OK with `session` containing `jsxCode`, `cssCode`, `chatHistory`.

5) Refine an existing session

POST `http://localhost:5000/api/v1/sessions`

Headers: `Authorization: Bearer <token>`

Body (JSON):

```json
{
  "userPrompt": "Make the button rounded and add validation",
  "sessionId": "<existing-session-id>"
}
```

Expected: 200 OK, session updated with new `jsxCode` and `cssCode`.

6) Update session code manually

PUT `http://localhost:5000/api/v1/sessions/:id`

Headers: `Authorization: Bearer <token>`

Body (JSON):

```json
{
  "jsxCode": "export default function App(){ return <div>Updated</div> }",
  "cssCode": "body{background:#fff;}"
}
```

Expected: 200 OK, updated session returned.

## Notes

- The Gemini AI call will fail unless `GEMINI_API_KEY` and `GEMINI_API_URL` are set to valid, reachable values. If you don't have an AI provider, you can still test auth and session CRUD flows by directly writing `Session` docs in MongoDB or mocking the GeminiController.
