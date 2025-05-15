import express from 'express'
import userAuth from '../middlewares/authMiddleware.js';
import { getUserData } from '../controllers/authUserController.js';

const userRouter = express.Router();

userRouter.get('/data', userAuth, getUserData);

export default userRouter;