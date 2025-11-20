# Deployment Details

This file documents how the project is intended to be deployed and what environment variables and build steps are required.

## Hosting Platforms

- Frontend: Static hosting such as Vercel or Netlify (project contains `client/` built with Vite).
- Backend: Serverless (AWS Lambda via `serverless.yml`) or a Node host for the Express app.
- Database: MongoDB Atlas (recommended) or a self-hosted MongoDB instance.

## Build Commands

- Frontend (client):
  - Install: `npm install`
  - Dev: `npm run dev`
  - Build: `npm run build` (produces static assets to deploy)

- Backend (Server):
  - Install: `npm install`
  - Dev (local): `npm run dev` (uses `nodemon server.js`)

## Production Environment Variables

Set the following in your production environment:

- `MONGO_URI` — MongoDB connection string.
- `JWT_SECRET` — secret used to sign JWT tokens.
- `JWT_EXPIRE` — optional token expiry (e.g., `30d`).
- `GEMINI_API_URL` — external AI endpoint URL.
- `GEMINI_API_KEY` — API key for Gemini.
- `VITE_API_URL` — (frontend) base URL for backend API in production.

## CI/CD

- No CI/CD pipeline is included in the repository. For deployment, typical steps are:
  1. Build frontend (`client/npm run build`) and deploy generated static files.
  2. Deploy backend using `serverless` framework or a container/VM with Node.

## Serverless Notes

- `Server/server.js` exports a `handler` using `serverless-http`. The included `serverless.yml` can be used to deploy to AWS Lambda + API Gateway.
- If using serverless, ensure `GEMINI_API_KEY` and `JWT_SECRET` are stored securely in the provider's environment (AWS Lambda environment variables or Secrets Manager).

## Live URLs

- Replace with your actual deployed URLs after deployment. The architecture references `https://snap-stack-pw13.vercel.app` in CORS origins, but do not rely on that value unless you control that deployment.
