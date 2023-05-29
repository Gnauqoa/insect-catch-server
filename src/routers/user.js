import {
  addDevice,
  deleteDevice,
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
import userDeviceAuth from "../middleware/userDeviceAuth.js";
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
userRouter.get("/device/:device_id", userAuth, userDeviceAuth, getDevice);
userRouter.put("/device/:device_id", userAuth, userDeviceAuth, updateDevice);
userRouter.delete("/device/:device_id", userAuth, userDeviceAuth, deleteDevice);

export default userRouter;
