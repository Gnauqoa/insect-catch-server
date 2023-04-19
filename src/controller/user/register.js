import dayjs from "dayjs";
import UserModel from "../../model/user.js";

const register = async (req, res) => {
  try {
    const { first_name, last_name, birth, email, password } =
      req.body;
    const existingUser = await UserModel.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });
    const user = new UserModel({
      email,
      first_name,
      last_name,
      birth: dayjs(birth).toDate(),
      password: password || "12345678",
    });
    await user.save();
    res.status(201).json({
      message: "Register success",
      data: await user.createRes(),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default register;
