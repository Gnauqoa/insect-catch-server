import { Router } from "express";
import userRouter from "./user.js";
import deviceRouter from "./device.js";

const router = Router();

router.use("/user", userRouter);
router.use("/device", deviceRouter);

export default router;
