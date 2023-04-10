import DeviceModel from "../model/device.js";

const deviceAuth = async (device_id, password) => {
  const device = await DeviceModel.findOne({
    _id: device_id,
    password: password,
  });
  if (device) return device;
  return false;
};

export default deviceAuth;
