import UserService from "../../services/UserService/index.js";

const logoutAll = async (req, res) => {
  try {
    await new UserService(req.user).logoutAll();
    res.status(200).json({ data: { message: "logout success!" } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default logoutAll;
