import clientMQTT from "../../config/mqtt.js";
import deviceAuth from "../../middleware/deviceAuth.js";

const deviceGetData = async (payload) => {
  const data = JSON.parse(payload);
  const { device_id, password } = data;
  try {
    const device = await deviceAuth(device_id, password);
    clientMQTT.publish(
      `device/${device_id}`,
      JSON.stringify({ status: 200, data: await device.createRes() })
    );
  } catch (err) {
    console.log(err);
    clientMQTT.publish(
      `device/${device_id}`,
      JSON.stringify({ status: 401, message: err.message })
    );
  }
};

export default deviceGetData;