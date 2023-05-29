import UserService from "../../services/userService.js";

const logout = async (req, res) => {
  try {
    const { user, indexToken } = req;
    await new UserService(user).logout(indexToken);
    res.status(200).json({ data: { message: "logout success!" } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default logout;
