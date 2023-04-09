import { register } from "../controller/user/index.js";
import { Router } from "express";

const userRouter = Router();

userRouter.post("/current", register);

export default userRouter;
