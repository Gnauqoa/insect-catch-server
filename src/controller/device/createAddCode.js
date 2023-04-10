import deviceAuth from "../../middleware/deviceAuth.js";
import clientMQTT from "../../config/mqtt.js";
import AddQueueModel from "../../model/addQueue.js";
import UserModel from "../../model/user.js";
import createRandomString from "../../services/createRandomString.js";
import dayjs from "dayjs";

const createAddCode = async (payload) => {
  const data = JSON.parse(payload);
  const { device_id, password } = data;
  try {
    const device = await deviceAuth(device_id, password);
    if (!device) {
      clientMQTT.publish(
        `device/${device_id}`,
        JSON.stringify({ status: 404, message: "Can't found device" })
      );
      return;
    }
    if (device.user)
      await UserModel.findOneAndUpdate(
        { _id: device.user },
        { $pull: { device_list: { device_id: device_id } } }
      );
    device.user = null;
    await device.save();
    await AddQueueModel.deleteMany({ device_id: device_id });
    const newQueue = new AddQueueModel({
      device_id: device_id,
      add_code: createRandomString(6),
      expires_in: dayjs().add("15", "minute").toDate(),
    });
    await newQueue.save();
    clientMQTT.publish(
      `device/${device_id}`,
      JSON.stringify({
        status: 201,
        message: "OK",
        data: { code: newQueue.add_code },
      })
    );
  } catch (err) {
    console.log(err);
    clientMQTT.publish(
      `device/${device_id}`,
      JSON.stringify({ status: 401, message: err.message })
    );
  }
};

export default createAddCode;
