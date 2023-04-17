import {
  addDevice,
  getUser,
  login,
  logout,
  register,
  requestAccessToken,
} from "../controller/user/index.js";
import { Router } from "express";
import userAuth from "../middleware/userAuth.js";
import addedAuth from "../middleware/addedAuth.js";
import { getDevice, updateDevice } from "../controller/device/index.js";

const userRouter = Router();

userRouter.post("/", register);
userRouter.post("/refresh_token", requestAccessToken);

userRouter.post("/login", login);
userRouter.get("/current", userAuth, getUser);
userRouter.delete("/current/logout", userAuth, logout);
userRouter.post("/current/addDevice", userAuth, addDevice);
userRouter.get("/current/device/:device_id", userAuth, addedAuth, getDevice);
userRouter.put("/current/device/:device_id", userAuth, addedAuth, updateDevice);

export default userRouter;
