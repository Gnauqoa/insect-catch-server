import UserService from "../services/userService.js";

const addedAuth = async (req, res, next) => {
  try {
    const { device_id } = req.params;
    const device = await new UserService(req.user).verifyDevice(device_id);
    if (device === 404)
      return res
        .status(404)
        .json({ message: "You don't have permissions for this device" });
    req.device = device;
    req.device_id = device_id;
    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export default addedAuth;
