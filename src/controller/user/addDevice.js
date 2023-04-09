import AddQueueModel from "../../model/addQueue";
import DeviceModel from "../../model/device";
import UserModel from "../../model/user";

const addDevice = async (req, res) => {
  try {
    const add_code = req.body.add_code;
    const user = req.user;
    const queue = await AddQueueModel.findOne({ add_code: add_code });
    if (!queue) {
      res.status(400).json({ message: "Device code is not valid" });
    }
    await UserModel.findOneAndUpdate(
      { _id: user.id },
      {
        $push: {
          device_list: { device_id: queue.device_id },
        },
      }
    );
    const new_device = await DeviceModel.findById(queue.device_id);
    res.status(201).json({
      message: "Add device success",
      data: await new_device.createRes(),
    });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

export default addDevice;
