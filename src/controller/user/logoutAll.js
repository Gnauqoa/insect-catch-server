const logoutAll = async (req, res) => {
  try {
    const { userService } = req;
    await userService.logoutAll();
    res.status(200).json({ data: { message: "logout success!" } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default logoutAll;
