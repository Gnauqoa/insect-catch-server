import UserService from "../../services/userService.js";

const getDeviceList = async (req, res) => {
  const { user } = req;
  res.status(200).json({
    data: { items: await new UserService(user).getDeviceList() },
  });
};

export default getDeviceList;
