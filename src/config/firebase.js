import admin from "firebase-admin";
import {} from "dotenv/config";

const configFirebase = () => {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY,
    }),
    databaseURL: process.env.DATABASE_URL,
  });
  console.log("connect firebase");
};

export default configFirebase;
