import UserModel from "../../model/user.js";
import bcrypt from "bcrypt";
import {} from "dotenv/config";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(401).json({ message: "Email does not exist" });
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch)
      return res.status(401).json({ message: "Password not correct" });
    const token = await user.createAccessToken();
    res.status(200).json({ data: { access_token: token } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default login;
