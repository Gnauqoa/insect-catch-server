import UserService from "../../services/userService.js";

const register = async (req, res) => {
  try {
    const { first_name, last_name, birth, email, password } = req.body;
    const registerStatus = await new UserService().register(
      first_name,
      last_name,
      birth,
      email,
      password
    );
    if (registerStatus) {
      res.status(201).json({
        message: "Register success",
        data: registerStatus,
      });
      return;
    }
    res.status(409).json({ message: "User already exists" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default register;
