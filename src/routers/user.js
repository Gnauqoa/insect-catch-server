import {
  addDevice,
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
import upload from "../config/cloudinary.js";
const userRouter = Router();

userRouter.post("/", register);
userRouter.post("/refresh_token", requestAccessToken);

userRouter.post("/login", login);
userRouter.get("/current", userAuth, getUser);
userRouter.delete("/current/logout", userAuth, logout);
userRouter.delete("/current/logout_all", userAuth, logoutAll);

userRouter.post("/test", upload.single("image"), async (req, res) => {
  try {
    res.status(200).json({ file: req.file });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to upload image" });
  }
});

userRouter.post("/current/add_device", userAuth, addDevice);
userRouter.get("/current/device/:device_id", userAuth, addedAuth, getDevice);
userRouter.put("/current/device/:device_id", userAuth, addedAuth, updateDevice);

export default userRouter;
