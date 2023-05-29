import deviceAuth from "../../middleware/deviceAuth.js";
import DeviceService from "../../services/deviceService.js";

const getControlData = async (payload) => {
  const data = JSON.parse(payload);
  const { device_id, password } = data;
  let device;
  try {
    device = await deviceAuth(device_id, password);
    if (!device) return;
    const deviceService = new DeviceService(device);
    const control_data = await deviceService.createControlData();
    deviceService.sendMessage({
      status: 200,
      data: control_data,
    });
  } catch (err) {
    console.log(err);

    if (!device) return;
    await new DeviceService(device).sendMessage({
      status: 500,
      message: err.message,
    });
  }
};

export default getControlData;
