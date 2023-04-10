import { Router } from "express";
import { addTopic } from "../config/mqtt.js";
import {
  createDevice,
  deviceCreateAddEvent,
  deviceGetData,
} from "../controller/device/index.js";

const deviceRouter = Router();

deviceRouter.post("/", createDevice);
// for device
addTopic("deviceCreateAddEvent", deviceCreateAddEvent);
addTopic("deviceGetData", deviceGetData);

export default deviceRouter;
