import { Router } from "express";
import { addTopic } from "../config/mqtt.js";
import {
  createDevice,
  createAddCode,
  deviceGetData,
} from "../controller/device/index.js";

const deviceRouter = Router();

deviceRouter.post("/", createDevice);

addTopic("createAddCode", createAddCode);
addTopic("deviceGetData", deviceGetData);
export default deviceRouter;
