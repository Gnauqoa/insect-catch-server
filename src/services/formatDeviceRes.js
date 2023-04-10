import formatUserRes from "./formatUserRes.js";

const formatDeviceRes = (device) => {
  return {
    id: device._id,
    battery: device.battery,
    brightness: device.brightness,
    coordinates: device.coordinates,
    humi: device.humi,
    location: device.location,
    optic: device.optic,
    temp: device.temp,
    rain: device.rain,
    status: device.status,
    grid_status: device.grid_status,
    time_end: device.time_end,
    time_start: device.time_start,
    time_send: device.time_send,
    user: device.user,
  };
};

export default formatDeviceRes;
