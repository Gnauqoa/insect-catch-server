import { Router } from "express";
import { createAddEvent } from "../controller/deviceSimulator/index.js";

const deviceSimulatorRouter = Router();

deviceSimulatorRouter.post("/addEvent", createAddEvent);

export default deviceSimulatorRouter;
