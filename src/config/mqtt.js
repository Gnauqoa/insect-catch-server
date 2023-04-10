import mqtt from "mqtt";
import {} from "dotenv/config";

const mqttUrl = `mqtt://${process.env.hostMQTT}:${process.env.portMQTT}`;

const clientMQTT = mqtt.connect(mqttUrl, {
  clean: true,
  connectTimeout: 4000,
  reconnectPeriod: 1000,
});
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
export default clientMQTT;
export { addTopic };
