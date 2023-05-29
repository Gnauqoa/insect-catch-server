import DeviceService from "../../services/deviceService.js";

const updateDevice = async (req, res) => {
  try {
    const device = req.device;
    const { control_data } = req.body;
    res.status(200).json({
      message: "Update control data success!",
      data: await new DeviceService(device).updateControlData(control_data),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default updateDevice;
