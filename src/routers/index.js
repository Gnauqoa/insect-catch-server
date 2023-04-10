import { Router } from "express";
import userRouter from "./user.js";
import deviceRouter from "./device.js";
import clientMQTT from "../config/mqtt.js";
import deviceSimulatorRouter from "./deviceSimulator.js";

const router = Router();

router.use("/user", userRouter);
router.use("/device", deviceRouter);
router.use("/deviceSimulator", deviceSimulatorRouter);

export default router;
