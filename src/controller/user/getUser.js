const getUser = async (req, res) => {
  try {
    const userService = req.userService;
    res.json({ data: userService.getUser() });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default getUser;
