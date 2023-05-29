import DeviceService from "../../services/deviceService.js";

const getDevice = async (req, res) => {
  try {
    res
      .status(200)
      .json({ data: await new DeviceService(req.device).getDevice() });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default getDevice;
