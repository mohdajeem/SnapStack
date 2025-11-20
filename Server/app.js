
// import express from 'express';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import cookieParser from 'cookie-parser';

// // --- Load Environment Variables ---
// dotenv.config();

// // Import routes lazily so we can catch and log import-time errors (which
// // may throw when modules register malformed routes during import).
// let userRoute;
// let sessionRoute;
// try {
//   // top-level await is supported in Node ESM; this lets us catch errors
//   // that happen during module evaluation (e.g., malformed route strings).
//   console.log('Importing route module: ./routes/userRoute.js');
//   userRoute = (await import('./routes/userRoute.js')).default;
//   console.log('Importing route module: ./routes/sessionRoute.js');
//   sessionRoute = (await import('./routes/sessionRoute.js')).default;
// } catch (err) {
//   console.error('Failed to import route modules:', err && err.stack ? err.stack : err);
//   // rethrow so the process exits and the error is visible where the app is started
//   throw err;
// }

// const app = express();

// // --- Middleware ---
// // app.use(cors({
// //     origin: ['http://localhost:5173', 'https://snap-stack-pw13.vercel.app'],
// //     credentials: true
// // }));

// // import cors from "cors";
// const allowedOrigins = [
//   "http://localhost:5173",
//   "https://snap-stack-pw13.vercel.app"
// ];
// app.use(cors({
//   origin: allowedOrigins,
//   credentials: true
// }));

// // Ensure preflight is handled even if API Gateway isn't proxying OPTIONS through
// // This makes the Express app explicitly respond 200 to OPTIONS requests with
// // the expected CORS response headers so the browser preflight passes.
// app.options('*', cors({
//   origin: allowedOrigins,
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
// }));

// // Fallback OPTIONS handler: some gateways may forward OPTIONS to Lambda/Express
// // so catch them here and respond with the proper headers and a 200 status.
// app.use((req, res, next) => {
//   if (req.method === 'OPTIONS') {
//     const origin = req.headers.origin;
//     if (allowedOrigins.includes(origin)) {
//       res.setHeader('Access-Control-Allow-Origin', origin);
//     }
//     res.setHeader('Access-Control-Allow-Credentials', 'true');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//     res.setHeader('Access-Control-Allow-Headers', req.headers['access-control-request-headers'] || 'Content-Type, Authorization');
//     return res.sendStatus(200);
//   }
//   next();
// });

// // for AWS deployment 
// // --- CORS Middleware ---
// // app.use((req, res, next) => {
// //   const allowedOrigins = [
// //     'http://localhost:5173',
// //     'https://snap-stack-pw13.vercel.app'
// //   ];
// //   const origin = req.headers.origin;

// //   if (allowedOrigins.includes(origin)) {
// //     res.setHeader('Access-Control-Allow-Origin', origin);
// //   }

// //   res.setHeader('Access-Control-Allow-Credentials', 'true');
// //   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
// //   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

// //   // Handle preflight OPTIONS request quickly
// //   if (req.method === 'OPTIONS') {
// //     return res.sendStatus(200);
// //   }

// //   next();
// // });
// // const allowedOrigins = [
// //   "http://localhost:5173",
// //   "https://snap-stack-pw13.vercel.app"
// // ];

// // app.use(
// //   cors({
// //     origin: function (origin, callback) {
// //       if (!origin || allowedOrigins.includes(origin)) {
// //         callback(null, true);
// //       } else {
// //         callback(new Error("Not allowed by CORS"));
// //       }
// //     },
// //     credentials: true,
// //     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
// //     allowedHeaders: ["Content-Type", "Authorization"],
// //   })
// // );



// app.use(express.json());
// app.use(cookieParser());

// // --- CORRECTED API ROUTES ---
// // 2. Use the user routes
// // Mount routes with guards so we can log the exact path if route compilation fails
// const safeMount = (path, handler) => {
//   try {
//     console.log(`Mounting path: ${String(path)} - handler type: ${typeof handler}`);
//     app.use(path, handler);
//   } catch (err) {
//     console.error(`Failed to mount route at path: ${path}`);
//     console.error(err && err.stack ? err.stack : err);
//     // Re-throw so the process still fails loudly in environments like Lambda
//     throw err;
//   }
// };

// // 2. Use the user routes (guarded)
// // Inspect router contents before mounting to help find malformed paths
// const inspectRouter = (router, name) => {
//   try {
//     if (!router) {
//       console.log(`inspectRouter: ${name} is falsy`);
//       return;
//     }
//     const layers = router.stack || router.router?.stack || [];
//     const info = layers.map((layer) => {
//       try {
//         if (layer.route && layer.route.path) return { type: 'route', path: layer.route.path };
//         if (layer.name) return { type: 'layer', name: layer.name };
//         if (layer.regexp) return { type: 'regexp', regexp: layer.regexp.toString() };
//         return { type: 'unknown' };
//       } catch (e) {
//         return { type: 'error inspecting layer', error: e.message };
//       }
//     });
//     console.log(`Router ${name} inspection:`, JSON.stringify(info, null, 2));
//   } catch (err) {
//     console.error(`Failed to inspect router ${name}:`, err && err.stack ? err.stack : err);
//   }
// };

// inspectRouter(userRoute, 'userRoute');
// safeMount('/api/v1/auth', userRoute);
// // 3. Use the new session routes for all AI and session management (guarded)
// inspectRouter(sessionRoute, 'sessionRoute');
// safeMount('/api/v1/sessions', sessionRoute);

// // The old '/api/v1/generateai' route is no longer needed.

// // app.get('/', (req, res) => {
// //     res.send("API is running successfully!");
// // });

// export { app };

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// --- Load Environment Variables ---
dotenv.config();

// --- Import Routes ---
import userRoute from './routes/userRoute.js';
import sessionRoute from './routes/sessionRoute.js';

const app = express();

// --- Middleware ---
const allowedOrigins = [
  'http://localhost:5173',
  'https://snap-stack-pw13.vercel.app'
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

// --- Routes ---
app.use('/api/v1/auth', userRoute);
app.use('/api/v1/sessions', sessionRoute);

app.get('/', (req, res) => {
  res.send('API is running successfully!');
});

export { app };
