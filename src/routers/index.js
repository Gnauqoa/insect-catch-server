import { Router } from "express";
import userRouter from "./user.js";
import deviceRouter from "./device.js";
import clientMQTT from "../config/mqtt.js";

const router = Router();

router.use("/user", userRouter);
router.use("/device", deviceRouter);

export default router;
