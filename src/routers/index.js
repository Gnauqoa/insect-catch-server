import { Router } from "express";
import userRouter from "./user.js";
import deviceRouter from "./device.js";

const router = Router();

router.use("/user", userRouter);
router.use("/device", deviceRouter);
router.get(
  "/",
  (req, res) =>
    async function (req, res) {
      try {
        res.status(200).json({ message: "OK" });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    }
);
export default router;
