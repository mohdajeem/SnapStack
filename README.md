# 🚀 SnapStack – AI-Powered Component & Page Generator
### 🔗 Live Demo: snap-stack-pw13.vercel.app
### 📂 GitHub Repo: github.com/mohdajeem/SnapStack

# 📖 Overview
 SnapStack is an AI-driven micro-frontend playground that lets developers:

## 💬 Chat with an AI model to generate React components and pages (JSX + CSS)

## ⚡ Preview code output live in a secure iframe

## 💾 Resume previous sessions with full code and chat history

## 📦 Export generated code as a ZIP or copy it directly

# 🧱 Architecture
<img src="https://github.com/user-attachments/assets/e8d4d7d9-7629-4a00-9d4d-cbf168a3ae79" width="100%" alt="SnapStack Architecture Diagram" />
A high-level overview showing the integration of the frontend, backend, AI model APIs, and persistent storage.

## 🧠 State Management & Persistence
## 🔐 Authentication & Sessions
##### JWT-based auth for secure session handling

Tokens stored in localStorage

API routes protected via middleware

## 📦 Local & Global State
useState, useEffect, and REST API calls to sync frontend and backend

Code editor, preview, and chat states persist on every AI interaction

Sessions saved in MongoDB for full recovery

## 🔁 Session Persistence
Sessions fetched via GET /sessions upon login

Restores entire session context: chat, JSX, CSS, preview

Loaded directly into the dashboard and editors

## ⚙️ Key Decisions & Trade-Offs
Area	Decision	Trade-off
🔐 Auth	JWT + REST	Simple to implement; lacks social login flexibility
🤖 AI Integration	OpenRouter (GPT-4o, LLaMA3)	Avoids OpenAI quota issues; limits fine-tuning
🧱 Sandboxing	Embedded sandboxed <iframe>	Prevents eval/injection risks; slightly slower
💾 Persistence	Auto-save on every interaction	May cause excessive writes (future: debounce)
⚠️ Redis	Not yet implemented	Acceptable performance for now; can be added

## ✨ Features
✅ JWT-based login/signup with secure token flow

✅ AI chat interface to generate components & pages

✅ Live code preview inside sandboxed iframe

✅ Syntax-highlighted JSX/CSS editors

✅ Export as ZIP or copy to clipboard

✅ Full session history & code persistence (MongoDB)

## 🗂️ Tech Stack
Layer	Stack
Frontend	ReactJs
Backend	Node.js + Express (Railway)
Database	MongoDB Atlas
AI Model	GPT-4o / LLaMA3 via OpenRouter
Hosting	Vercel (Frontend), Railway (API)


# 🧪 Run Locally
Clone the repo and start both the frontend and backend:

## ⚙️ Environment Setup for Local Development
To run SnapStack on your local machine, you need to create .env files in both the frontend and backend directories.
### 🌐 Frontend (.env for Vite)
Create a .env file in your frontend root (where vite.config.js is located):
```
# URL of the backend server
VITE_API_URL=http://localhost:5000/api/v1

```
💡 This tells the frontend where to send API requests during development.



### 🧠 Backend (.env for Express.js)
Create a .env file in your backend root (where your server.js or app.js is located):
```
# Port on which the backend will run
PORT=5000

# MongoDB connection URI
MONGO_URI=your_mongodb_connection_string_here

# JWT secret and expiration
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=30d

# Gemini API (or any AI model you're using)
GEMINI_API_URL=your_gemini_api_url
GEMINI_API_KEY=your_gemini_api_key

```

## 🔧 Backend Setup
```
  cd server
  cp .env.example .env
  npm install
  npm run dev
```

## 🎨 Frontend Setup
```
  cd client
  cp .env.example .env
  npm install
  npm run dev
```


📝 License
This project is licensed under the MIT License.

