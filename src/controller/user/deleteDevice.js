const deleteDevice = (req, res) => {
  try {
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default deleteDevice;
