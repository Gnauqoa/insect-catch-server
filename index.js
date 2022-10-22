// server
const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const mqtt = require("mqtt");
const hostMQTT = "test.mosquitto.org";
const portMQTT = "1883";

// firebase
const admin = require("firebase-admin");
const { getFirestore } = require("firebase-admin/firestore");
// port
dotenv.config();
const port = process.env.PORT || 3000;

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: "insect-catch-electric",
    clientEmail:
      "firebase-adminsdk-ado4b@insect-catch-electric.iam.gserviceaccount.com",
    privateKey:
      "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDJf4hvNsJBgO+L\nTDqe9hK4lut+8UE78f1XREau6Ewl+yql1SgMUOup+5UOuuGILxhuurwphB+jj+Hd\n+SyTGDVOrCpu6Qauhxa+zgXpfjAi++jbdqvsZ8UbvH+zFwW6Ml2Zvt6BhXPaVgy7\nBzPPWzqh0CPIRuIKDM49SOQO/Abi7hIZd0eC4TldjORHPTgaG4/3wgg2Vzy8DpSt\nGTusOoA7DnK26V7RXyful5HSgeEGrw/9nN//b+ADr6jM6xw9tSvjcYBrWKL7Twxu\nliEWn8MswNu/ay+rmRv7hGUUGdLJJugvkx/6nRiIDAcuIyLU3eenzKzGKch4xfwH\nvC9pVKLXAgMBAAECggEAC7HvELCd8vO+QFiEgoHUl/AluDCqhGv8NBqoLsvlN4/t\n0fUFDD0m7UiT4AH9+xiFeeloTtFc8/JZV4SrdXIo2rZPB2O92b1isMczPD69u01I\nHtmZcVdoiL6WrtjxCFvKAPvW3RYKbl68m58qy6gHR1yis9buLn6/YOE5+c149nMx\nvLtSIGsbpJc/Z8z5YyzBOCoT8aDAgpRiZNPlzsGvm3Chsv5ErcuDcpKo3JqRV7ST\nBaJf2Dmm5Z7dXgQytgK5LbtdT3W/rtWgkfvgoPRz9ZUNgnYNnjX+3EmoyChUjjEZ\nSX59Qy7yV2ShjxtMb5uE/EfrtKie1n2/NAyGdZnaOQKBgQDwm/eakuHjGaaUzoRn\nCuV/DupRmpaAYnMR+oP3+X+cPG4PdG5XhrJecVKIGfQdO5drCxNUu4xo7eOglw1f\nElugK5pQ6/jie86ZNKyC9T7GMV0KfKy6YeDRVvzqTvkkB07Td8n44ojvKmzzqiT8\n6bt3v2ZyXqwRxJzHWSphi+FsWwKBgQDWYxzfof46ptOBupIbGBXbKxZZk+K6G1WI\nWZ5HyVLOHQDttbqtUb35EL8DHwLRi3VAaZRqIEsPb8EW+Ie/F/OIDaBb9HzKHBqi\n+3sYToFn/Qf/whSH7RJ/R6+c/40LFgwuHipyNe7T9vLbG6UuDgbDbbBT2+L37KsC\nhBSXAZHcNQKBgGzwoT4qbP4vOf48NzSUeW566VsDXEtKyAEG5UOcgsvRjJ+QvvkA\nMriSJKUc4yttNNSxkhIWTK+hriOi4Nn/7N5rf5ZOEUUye0tgzw8ITWDdLtw1sNs+\nv9ToxuCr2yAV8vnKTfdTUl6/Xc9BZTfh+BBy58a22L++vqF/3LGH7QvrAoGANbhk\nNc17zOqcuTctAUkJwP+M/ClIeOX8iswaE1bpPuiZoPcWrfN7rPt7Qab1p9hQKzHJ\nlMY+yMFyGvVv3nx7862mbyRWWLauHgTyFWcmmg4XgQj66AyJxAcMhESs7Qg7SRsZ\n+8Bz9f09YZYNz/qHy1SjCIBi4UkWmOzL1AL6r7kCgYBe1r33+kQuv3t+97sXnLjn\nJMsFRPQQ3RZpgbcX4ZdNvAGhxY9rc/z0EM6ETerEAXSXax1UDLRTEmLO58rTXWPl\niv1adYYdrANwpcKVIkmCk4PxE62tbciofqDgJoQyRFsMWLTrf201BgdL5yVjtqJI\nF1x2ukkIZvZXYpfLKa//WQ==\n-----END PRIVATE KEY-----\n",
  }),
  databaseURL:
    "https://insect-catch-electric-default-rtdb.asia-southeast1.firebasedatabase.app",
});
// admin.initializeApp({
//   credential: admin.credential.cert({
//     projectId: process.env.FIREBASE_PROJECT_ID,
//     privateKey: process.env.FIREBASE_PRIVATE_KEY,
//     clientEmail: process.env.FIREBASE_CLIENT_EMAIL
//   }),
//   databaseURL:
//     "https://insect-catch-electric-default-rtdb.asia-southeast1.firebasedatabase.app",
// });
const mqttUrl = `mqtt://${hostMQTT}:${portMQTT}`;
const clientMQTT = mqtt.connect(mqttUrl, {
  clean: true,
  connectTimeout: 4000,
  reconnectPeriod: 1000,
});
const db = getFirestore();

var jsonParser = bodyParser.json();

app.use(cors());
app.use(jsonParser);

clientMQTT.on("connect", () => {
  console.log("connect MQTT");
});
app.post("/updateDeviceData", jsonParser, async (req, res) => {
  try {
    {
      const idDevice = req.body.id;
      const dataUpdate = req.body.data;
      console.log(idDevice, dataUpdate);
      const deviceRef = db.collection("device").doc(idDevice);
      const updateReq = await deviceRef.update({ ...dataUpdate });
      console.log(updateReq);
      res.send(updateReq);
    }
  } catch (error) {
    console.log(error);
  }
});
app.post("/updateDeviceImg", jsonParser, async (req, res) => {
  try {
    {
      const idDevice = req.body.id;
      const imgUpdate = req.body.data.img;
      console.log(idDevice, { imgUrl: imgUpdate });
      const deviceRef = db.collection("device").doc(idDevice);
      const updateReq = await deviceRef.update({ imgUrl: imgUpdate });
      console.log(updateReq);
      res.send(updateReq);
    }
  } catch (error) {
    console.log(error);
  }
});
app.post("/checkConnect", async (req, res) => {
  try {
  } catch (error) {
    return error;
  }
});
app.post("/userUpdateDevice", jsonParser, async (req, res) => {
  try {
    const deviceID = req.body.deviceID;
    const ledColor = req.body.ledColor;
    const brightness = req.body.brightness;
    console.log(deviceID, ":", ledColor, brightness);
    clientMQTT.publish(
      `/${deviceID}`,
      JSON.stringify({
        ledColor: ledColor,
        brightness: brightness,
      }),
      { qos: 0, retain: false },
      (error) => {
        if (error) {
          console.error(error);
        }
      }
    );
    res.send("updated!");
  } catch (error) {
    return error;
  }
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
