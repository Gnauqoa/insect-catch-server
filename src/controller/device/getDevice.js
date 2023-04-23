import DeviceModel from "../../model/device.js";

const getDevice = async (req, res) => {
  try {
    const device_id = req.device_id;
    const device_data = await DeviceModel.findById(device_id);
    res.status(200).json({ data: await device_data.createRes() });
  } catch (err) {
    console.log(err)
    req.status(500).json({ message: err.message });
  }
};

export default getDevice;
