import UserService from "../../services/UserService/index.js";

const getUser = async (req, res) => {
  try {
    const serviceUser = new UserService(req.user);
    const userData = await serviceUser.getUser();
    res.json({ data: userData });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default getUser;
