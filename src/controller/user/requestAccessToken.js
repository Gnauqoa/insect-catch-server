import UserModel from "../../model/user.js";
import jwt from "jsonwebtoken";

const access_token_key = process.env.ACCESS_TOKEN_KEY;
const access_token_expires_time = process.env.ACCESS_TOKEN_EXPIRES_TIME;
const refresh_token_key = process.env.REFRESH_TOKEN_KEY;

const requestAccessToken = async (req, res) => {
  try {
    const { refresh_token } = req.body;
    const decodedToken = jwt.verify(refresh_token, refresh_token_key);
    const user = await UserModel.findOne({
      _id: decodedToken.userId,
    });
    if (!user) return res.status(401).json({ error: "Unauthorized" });
    const indexToken = user.tokens.findIndex(
      (ele) => ele.refresh_token === refresh_token
    );
    if (indexToken === -1)
      return res.status(401).json({ error: "Unauthorized" });
    const access_token = await jwt.sign(
      { userId: decodedToken.userId },
      access_token_key,
      {
        expiresIn: access_token_expires_time,
      }
    );
    user.tokens[indexToken].access_token = access_token;
    await user.save();
    res.status(200).json({ data: { access_token } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default requestAccessToken;
