import {
  addDevice,
  getUser,
  login,
  register,
} from "../controller/user/index.js";
import { Router } from "express";
import userAuth from "../middleware/userAuth.js";

const userRouter = Router();

userRouter.post("/current", register);
userRouter.post("/current/login", login);
userRouter.get("/current", userAuth, getUser);
userRouter.post("/current/addDevice", userAuth, addDevice);
export default userRouter;
