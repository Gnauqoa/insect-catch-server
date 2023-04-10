const addedAuth = async (req, res, next) => {
  try {
    const { device_id } = req.params;
    if (
      req.user.device_list.findIndex(
        (ele) => ele.device_id.toString() === device_id
      ) === -1
    ) {
      res
        .status(404)
        .json({ message: "You don't have permissions for this device" });
      return;
    }
    req.device_id = device_id;
    next();
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

export default addedAuth;
