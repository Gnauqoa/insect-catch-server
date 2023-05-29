const logout = async (req, res) => {
  try {
    const { indexToken, userService } = req;
    await userService.logout(indexToken);
    res.status(200).json({ data: { message: "logout success!" } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default logout;
