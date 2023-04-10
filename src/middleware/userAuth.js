import UserModel from "../model/user.js";
import jwt from "jsonwebtoken";
import {} from "dotenv/config";

const secretKey = process.env.JWT_KEY;

const userAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, secretKey);
    const user = await UserModel.findOne({
      _id: decodedToken.userId,
    });
    if (!user) return res.status(401).json({ error: "Unauthorized" });
    if (
      user.access_tokens.findIndex((ele) => ele.access_tokens === token) === -1
    )
      return res.status(401).json({ error: "Unauthorized" });
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).send({ error: "Unauthorized" });
  }
};

export default userAuth;
