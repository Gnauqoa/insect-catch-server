import deviceAuth from "../../middleware/deviceAuth.js";
import DeviceService from "../../services/deviceService.js";

const createAddEvent = async (payload) => {
  const data = JSON.parse(payload);
  const { device_id, password } = data;
  let device;
  try {
    device = await deviceAuth(device_id, password);
    if (!device) return;
    const deviceService = new DeviceService(device);
    const add_code = await deviceService.createAddDeviceCode();
    deviceService.sendMessage({
      status: 201,
      message: "add code",
      data: { code: add_code },
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

export default createAddEvent;
