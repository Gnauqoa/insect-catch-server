import { getUser, login, register } from "../controller/user/index.js";
import { Router } from "express";
import userAuth from "../middleware/userAuth.js";

const userRouter = Router();

userRouter.post("/current", register);
userRouter.post("/current/login", login);
userRouter.get("/current", userAuth, getUser);

export default userRouter;
