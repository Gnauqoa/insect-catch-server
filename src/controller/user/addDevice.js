import dayjs from "dayjs";
import AddQueueModel from "../../model/addQueue.js";
import DeviceModel from "../../model/device.js";
import UserModel from "../../model/user.js";

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
    await AddQueueModel.deleteMany({ device_id: queue.device_id });
    res.status(201).json({
      message: "Add device success",
      data: await new_device.createRes(),
    });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

export default addDevice;
