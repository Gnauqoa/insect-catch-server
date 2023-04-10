import formatUserRes from "../../services/formatUserRes.js";

const getUser = async (req, res) => {
  try {
    res.json({ data: formatUserRes(req.user) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default getUser;
