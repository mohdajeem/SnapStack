
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// --- Load Environment Variables ---
dotenv.config();

import userRoute from './routes/userRoute.js';
import sessionRoute from './routes/sessionRoute.js';

const app = express();

// --- Middleware ---
app.use(cors({
    origin: process.env.VITE_FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// --- CORRECTED API ROUTES ---
// 2. Use the user routes
app.use('/api/v1/auth', userRoute);
// 3. Use the new session routes for all AI and session management
app.use('/api/v1/sessions', sessionRoute);

// The old '/api/v1/generateai' route is no longer needed.

app.get('/', (req, res) => {
    res.send("API is running successfully!");
});

export { app };