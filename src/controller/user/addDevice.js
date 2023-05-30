const addDevice = async (req, res) => {
  try {
    const add_code = req.body.add_code;
    const userService = req.userService;
    const new_device = await userService.addDevice(add_code);
    if (new_device === 401)
      return res.status(401).json({ message: "Code has expired." });
    if (new_device === 400)
      return res.status(400).json({ message: "Device code is not valid" });
    if (new_device === 409)
      return res.status(409).json({ message: "Device is not ready" });
    res.status(201).json({
      message: "Add device success",
      data: new_device,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default addDevice;
