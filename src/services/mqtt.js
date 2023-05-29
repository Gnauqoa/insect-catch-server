import clientMQTT from "../config/mqtt.js";
import validator from "validator";
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
const publishMessage = (topic, message) => {
  clientMQTT.publish(topic, message);
};
export { addTopic, publishMessage };
