import express from 'express';
import {app} from './app.js';
import { connectDb } from './config/db.js';

const PORT = 5000;
connectDb();

app.listen(PORT, () => {
    console.log(`server is running on the port http://localhost:${PORT}`);
})






