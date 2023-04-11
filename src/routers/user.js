import {
  addDevice,
  getUser,
  login,
  register,
} from "../controller/user/index.js";
import { Router } from "express";
import userAuth from "../middleware/userAuth.js";
import addedAuth from "../middleware/addedAuth.js";
import { getDevice, updateDevice } from "../controller/device/index.js";

const userRouter = Router();

userRouter.post("/current", register);
userRouter.post("/current/login", login);
userRouter.get("/current", userAuth, getUser);
userRouter.post("/current/addDevice", userAuth, addDevice);
userRouter.get("/device/:device_id", userAuth, addedAuth, getDevice);
userRouter.put("/device/:device_id", userAuth, addedAuth, updateDevice);

export default userRouter;
