import dayjs from "dayjs";
import AddQueueModel from "../../model/addQueue.js";
import DeviceModel from "../../model/device.js";
import UserModel from "../../model/user.js";
import clientMQTT from "../../config/mqtt.js";

const addDevice = async (req, res) => {
  try {
    const add_code = req.body.add_code;
    const user = req.user;
    const queue = await AddQueueModel.findOne({ add_code: add_code });
    if (!queue) {
      res.status(400).json({ message: "Device code is not valid" });
      return;
    }
    if (dayjs().isAfter(queue.expires_in)) {
      res.status(400).json({ message: "Code is expired" });
      return;
    }
    await UserModel.findOneAndUpdate(
      { _id: user._id },
      {
        $push: {
          device_list: { device_id: queue.device_id },
        },
      }
    );
    const new_device = await DeviceModel.findOneAndUpdate(
      {
        _id: queue.device_id,
      },
      { $set: { user: user._id } }
    );
    clientMQTT.publish(
      `device/${queue.device_id}`,
      JSON.stringify({
        status: 200,
        message: "Has been added",
        data: { user: { name: user.first_name + " " + user.last_name } },
      })
    );
    res.status(201).json({
      message: "Add device success",
      data: await new_device.createRes(),
    });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

export default addDevice;
