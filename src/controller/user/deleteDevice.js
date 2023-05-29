const deleteDevice = async (req, res) => {
  try {
    const device_id = req.device_id;
    const userService = req.userService;
    const delete_device = await userService.deleteDevice(device_id);
    if (!delete_device)
      return res.status(404).json({ message: "Device not found" });
    res.status(200).json({ message: "Delete success" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default deleteDevice;
