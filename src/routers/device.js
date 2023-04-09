import { Router } from "express";
import { createDevice } from "../controller/device/index.js";

const deviceRouter = Router();

deviceRouter.post("/", createDevice);

export default deviceRouter;
