import clientMQTT from "../../config/mqtt.js";

const createAddEvent = async (req, res) => {
  try {
    const { device_id, password } = req.body;
    clientMQTT.publish(
      "createAddCode",
      JSON.stringify({ device_id, password })
    );
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

export { createAddEvent };
