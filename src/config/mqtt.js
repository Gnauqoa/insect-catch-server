import mqtt from "mqtt";
import {} from "dotenv/config";

const mqttUrl = `mqtt://${process.env.hostMQTT}:${process.env.portMQTT}`;

const clientMQTT = mqtt.connect(mqttUrl, {
  clean: true,
  connectTimeout: 4000,
  reconnectPeriod: 1000,
});

export default clientMQTT;
