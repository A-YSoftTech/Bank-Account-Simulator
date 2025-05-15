// backend/app.js
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import connectDB from './config/dbConfig.js'
import transactionRoutes from './routes/transactionRoutes.js';

import authRouter from './routes/userRoutes.js'
import userRouter from './routes/authUserRoutes.js'
import dotenv from 'dotenv';

dotenv.config();

const app = express();


const allowedOrigins = ['http://localhost:5173']
// Middleware
app.use(express.json());
app.use(cookieParser())
app.use(cors({origin : allowedOrigins, credentials : true}));

// Connect to MongoDB
connectDB();

// API Routes
app.get('/', (req, res) => res.send('API is running...'));
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/transactions', transactionRoutes);

// Start server
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
