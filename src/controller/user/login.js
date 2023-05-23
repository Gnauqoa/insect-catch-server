import UserService from "../../services/UserService/index.js";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const loginStatus = await new UserService().login(email, password);
    if (loginStatus) {
      res.status(200).json({ data: loginStatus });
      return;
    }
    res.status(401).json({ message: "Email or password not correct" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default login;
