import { Router } from "express";
import { addTopic } from "../config/mqtt.js";
import createAddCode from "../controller/device/createAddCode.js";
import createDevice from "../controller/device/createDevice.js";

const deviceRouter = Router();

deviceRouter.post("/", createDevice);

addTopic("createAddCode", createAddCode);

export default deviceRouter;
