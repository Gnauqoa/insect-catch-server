import UserModel from "../model/user.js";
import jwt from "jsonwebtoken";
import {} from "dotenv/config";

const access_token_key = process.env.ACCESS_TOKEN_KEY;

const userAuth = async (req, res, next) => {
  try {
    const access_token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(access_token, access_token_key);
    const user = await UserModel.findOne({
      _id: decodedToken.userId,
    });
    if (!user) return res.status(401).json({ error: "Unauthorized" });
    if (
      user.tokens.findIndex(
        (ele) => ele.access_token === access_token
      ) === -1
    )
      return res.status(401).json({ error: "Unauthorized" });
    req.user = user;
    req.access_token = access_token;
    next();
  } catch (error) {
    res.status(401).send({ error: "Unauthorized" });
  }
};

export default userAuth;
