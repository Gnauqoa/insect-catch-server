const logout = async (req, res) => {
  try {
    const { user, indexToken } = req;
    user.tokens.splice(indexToken, 1);
    await user.save();
    res.status(200).json({ data: { message: "logout success!" } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default logout;
