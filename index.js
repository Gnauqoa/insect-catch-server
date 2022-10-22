// server
const dotenv = require("dotenv");
const express = require("express");
const app = express();
// const cors = require("cors");
// firebase
const admin = require("firebase-admin");
const { getFirestore } = require("firebase-admin/firestore");
// port
dotenv.config();
const port = process.env.PORT || 3000;
const serviceAccount = require("./firebase_key.json");

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: "insect-catch-electric",
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
  }),
  databaseURL: process.env.DATABASE_URL,
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
const db = getFirestore();

// app.use(cors());
app.get("/test", async (req, res) => {
  try {
    const snapshot = await db.collection("users").get();
    const data = [];
    snapshot.forEach((doc) => {
      data.push(doc.data());
    });
    res.send(data);
  } catch (error) {
    console.log(error);
    res.send(error);
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
