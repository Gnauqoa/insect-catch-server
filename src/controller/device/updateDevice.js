import DeviceModel from "../../model/device.js";

const updateDevice = async (req, res) => {
  try {
    const device_id = req.device_id;
    const { control_data } = req.body;
    const device_data = await DeviceModel.findByIdAndUpdate(device_id, {
      $set: {
        brightness: control_data.brightness,
        led_color: control_data.led_color,
        time_end: control_data.time_end,
        time_start: control_data.time_start,
        time_send: control_data.time_send,
      },
    });

    res
      .status(200)
      .json({
        message: "Update control data success!",
        data: await device_data.createRes(),
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default updateDevice;
