import express from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import './database/connection.js';
import userRouter from './routes/user.route.js';
import productRouter from './routes/product.route.js';

const app = express();
const port = process.env.PORT || 5000;

// Setup for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors({
    origin: 'http://localhost:5173', // frontend origin
    credentials: true
}));
app.use(bodyParser.json());

// Routes
app.use('/user', userRouter);
app.use('/product', productRouter);

// Serve images statically from /uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Test route for API
app.get("/", (req, res) => {
    res.send("Server is running!");
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
