import deviceAuth from "../../middleware/deviceAuth.js";
import DeviceService from "../../services/deviceService.js";

const updateSensorData = async (payload) => {
  const data = JSON.parse(payload);
  const { device_id, password, device_data } = data;
  let device;
  try {
    device = await deviceAuth(device_id, password);
    if (!device) return;
    await new DeviceService(device).updateSensorData(device_data);
  } catch (err) {
    console.log(err);
    if (!device) return;
    await new DeviceService(device).sendMessage({
      status: 500,
      message: err.message,
    });
  }
};

export default updateSensorData;
