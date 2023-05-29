import UserService from "../services/userService.js";

const userAuth = async (req, res, next) => {
  try {
    const access_token = req.headers.authorization.split(" ")[1];
    const verify = await new UserService().verifyToken(access_token);
    if (verify) {
      req.user = verify.user;
      req.access_token = verify.access_token;
      req.indexToken = verify.indexToken;
      next();
      return;
    }
    res.status(401).json({ error: "Unauthorized" });
  } catch (error) {
    res.status(401).send({ error: "Unauthorized" });
  }
};

export default userAuth;
