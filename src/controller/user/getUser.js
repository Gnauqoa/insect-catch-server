import formatUserRes from "../../services/formatUserRes.js";

const getUser = async (req, res) => {
  try {
    res.json({ data: formatUserRes(req.user) });
  } catch (err) {
    res.status(401).json({ error: "Unauthorized" });
  }
};

export default getUser;
