import serverless from 'serverless-http';
import dotenv from 'dotenv';
import { connectDb } from './config/db.js';
import { app } from './app.js';

dotenv.config();

// Connect MongoDB
connectDb();

// Start local server or export for Lambda
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'lambda') {
  app.listen(PORT, () => console.log(`Server running locally on port ${PORT}`));
}

// Export handler for AWS Lambda
export const handler = serverless(app);
