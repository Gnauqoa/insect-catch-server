import clientMQTT from "../config/mqtt.js";

const addTopic = (topic, callback) => {
  clientMQTT.on("connect", () => {
    clientMQTT.subscribe(topic, () => {
      console.log("subscribe to topic", topic);
    });
  });
  clientMQTT.on("message", (_topic, payload) => {
    if (_topic === topic) callback(payload);
  });
};

export { addTopic };
