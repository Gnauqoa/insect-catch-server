import {} from "dotenv/config";
import DeviceModal from "../../model/device.js";

const adminCode = process.env.adminCode;

const createDevice = async (req, res) => {
  try {
    const admin_code = req.body.admin_code;
    if (adminCode !== admin_code)
      res.status(401).json({ error: "Unauthorized" });
    const device = new DeviceModal({});
    await device.save();
    res.status(201).json({
      message: "Create device success",
      data: await device.createRes(),
    });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

export default createDevice;
