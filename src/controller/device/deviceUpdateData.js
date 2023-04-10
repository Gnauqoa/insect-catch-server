import clientMQTT from "../../config/mqtt.js";
import deviceAuth from "../../middleware/deviceAuth.js";
import reverseGeocoding from "../../services/reverseGeocoding.js";

const deviceUpdateData = async (payload) => {
  const data = JSON.parse(payload);
  const { device_id, password, device_data } = data;
  try {
    const device = await deviceAuth(device_id, password);
    device.old_data.push({
      coordinates: device.coordinates,
      humi: device.humi,
      optic: device.optic,
      temp: device.temp,
      rain: device.rain,
      grid_status: device.grid_status,
      location: device.location,
    });
    device.battery = device_data.battery;
    device.coordinates = device_data.coordinates;
    device.humi = device_data.humi;
    device.optic = device_data.optic;
    device.temp = device_data.temp;
    device.rain = device_data.rain;
    device.grid_status = device_data.grid_status;
    const location = await reverseGeocoding(device_data.coordinates);
    device.location = location.data.display_name;
    await device.save();
  } catch (err) {
    console.log(err);
    clientMQTT.publish(
      `device/${device_id}`,
      JSON.stringify({ status: 500, message: err.message })
    );
  }
};

export default deviceUpdateData;
