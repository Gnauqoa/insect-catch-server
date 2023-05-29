import {
  addDevice,
  getDeviceList,
  getUser,
  login,
  logout,
  logoutAll,
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
userRouter.delete("/current/logout_all", userAuth, logoutAll);

userRouter.get("/device", userAuth, getDeviceList);
userRouter.post("/device/add_device", userAuth, addDevice);
userRouter.get("/device/:device_id", userAuth, addedAuth, getDevice);
userRouter.put("/device/:device_id", userAuth, addedAuth, updateDevice);

export default userRouter;
