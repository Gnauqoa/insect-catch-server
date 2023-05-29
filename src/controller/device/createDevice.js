import DeviceService from "../../services/deviceService.js";

const createDevice = async (req, res) => {
  try {
    res.status(201).json({
      message: "Create device success",
      data: await new DeviceService().createDevice(req.body.admin_code),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default createDevice;
