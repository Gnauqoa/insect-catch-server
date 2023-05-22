import formatDeviceRes from "../../services/formatDeviceRes.js";

const getDeviceList = async (req, res) => {
  try {
    const { user } = req;
    await user.populate("device_list.device_id");
    res.json({
      data: { items: user.device_list.map((ele) => formatDeviceRes(ele)) },
    });
  } catch (err) {}
};

export default getDeviceList;
