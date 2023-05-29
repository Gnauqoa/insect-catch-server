import UserService from "../../services/userService.js";

const getUser = async (req, res) => {
  try {
    const userData = await new UserService(req.user).getUser();
    res.json({ data: userData });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default getUser;
