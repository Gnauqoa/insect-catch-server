import UserService from "../../services/UserService/index.js";

const requestAccessToken = async (req, res) => {
  try {
    const { refresh_token } = req.body;
    const access_token = await new UserService().requestAccessToken(
      refresh_token
    );
    if (access_token) {
      res.status(200).json({ data: { access_token } });
      return;
    }
    res.status(401).json({ message: "Unauthorized" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default requestAccessToken;
