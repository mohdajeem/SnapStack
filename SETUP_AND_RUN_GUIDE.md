# Setup and Run Guide

This guide explains how to run the SnapStack project locally (both client and server).

## Prerequisites

- Node.js and npm (use the versions compatible with the `package.json` files in `client/` and `Server/`).
- MongoDB (Atlas connection string or local MongoDB instance).
- (Optional) `serverless` CLI if deploying serverless locally.

## 1. Clone the repository

```powershell
git clone <repo-url>
cd assignment
```

## 2. Environment variables

- Create a `.env` file for the backend in `Server/` (see `./.env.example` in repo root for required keys).
- For the frontend, create a `.env` in `client/` if you want to provide `VITE_API_URL` for production testing. In development the frontend uses a proxied `/api/v1` route.

Required keys (high level): see `.env.example`.

## 3. Install dependencies

Backend:

```powershell
cd Server
npm install
```

Frontend:

```powershell
cd ../client
npm install
```

## 4. Start MongoDB / configure Atlas

- If using MongoDB Atlas, add the connection string to `MONGO_URI` in `Server/.env`.
- If running locally, ensure `mongod` is running and `MONGO_URI` points to `mongodb://localhost:27017/<dbName>`.

## 5. Run locally

Backend (development):

```powershell
cd Server
npm run dev
# script defined: "dev": "nodemon server.js"
```

Frontend (development):

```powershell
cd client
npm run dev
# opens vite dev server (default port 5173)
```

By default the frontend uses a proxied base path `/api/v1` (see `client/src/services/api.js`) for development.

## 6. Create an account & test flow

1. Register via the frontend `/register` page (or send a POST to `/api/v1/auth/register`).
2. Login and generate a new workspace using the prompt UI.

## 7. Seeding data

- No seeding script provided. Create accounts through the UI or insert documents into MongoDB directly.

## 8. Troubleshooting

- If CORS errors appear, ensure `Server/app.js` includes your frontend origin in `allowedOrigins`.
- If JWT errors: ensure `JWT_SECRET` is set and consistent between backend runs.
- If AI calls fail: check `GEMINI_API_URL` and `GEMINI_API_KEY` in environment.

## 9. Production build (frontend)

```powershell
cd client
npm run build
# Deploy `client/dist` to a static host (Vercel, Netlify, etc.)
```

## 10. Serverless deployment

- The backend exports `handler` using `serverless-http` and includes `serverless.yml`. Use your preferred CI/CD or the `serverless` framework to deploy to AWS Lambda/API Gateway.
