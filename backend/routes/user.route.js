import express from 'express';
import { getAllUser, register, userDelete, userLogin } from '../controller/user.controller.js';
import { jwtVerified } from '../middleware/jwt.middleware.js';

const userRouter = express.Router();

userRouter.post("/register", register)
userRouter.post("/login",userLogin)
userRouter.get("/getAllUser", getAllUser)
userRouter.delete("/userDelete/:id", userDelete)

export default userRouter;