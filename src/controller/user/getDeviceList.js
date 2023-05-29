const getDeviceList = async (req, res) => {
  const { userService } = req;
  res.status(200).json({
    data: { items: await userService.getDeviceList() },
  });
};

export default getDeviceList;
