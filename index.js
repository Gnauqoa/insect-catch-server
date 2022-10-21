// server
const express = require("express");
const app = express();
const cors = require("cors");
// firebase
const admin = require("firebase-admin");
const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require("firebase-admin/firestore");
// port
const port = process.env.PORT || 3000;

const serviceAccount = require("./firebase_key.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://insect-catch-electric-default-rtdb.asia-southeast1.firebasedatabase.app",
});
const db = getFirestore();

const test = async () => {
  const snapshot = await db.collection("users").get();
  const data = [];
  snapshot.forEach((doc) => {
    data.push(doc.data());
  });
  console.log(data);
  return data;
};
app.use(cors());
app.get("/test", async  (req, res) => {
  try {
    const snapshot = await db.collection("users").get();
    const data = [];
    snapshot.forEach((doc) => {
      data.push(doc.data());
    });
    res.send(data);
  } catch {
    console.log(error);
  }
});

app.post("/test", async (req, res) => {
  admin.catch((error) => {
    res.json({
      error: false,
      message: error,
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
