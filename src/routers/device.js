import { Router } from "express";
import { addTopic } from "../services/mqtt.js"; 
import {
  createDevice,
  createAddEvent,
  getControlData,
  updateSensorData,
} from "../controller/device/index.js";

const deviceRouter = Router();

deviceRouter.post("/", createDevice);
// for device
addTopic("deviceCreateAddEvent", createAddEvent);
addTopic("deviceGetData", getControlData);
addTopic("deviceUpdateData", updateSensorData);

export default deviceRouter;
