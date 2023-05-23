import express from "express";
import {} from "dotenv/config";
import mongoose from "mongoose";
import configExpressApp from "./src/config/express.js";
import configMongoose from "./src/config/mongoose.js";

const app = express();

configExpressApp(app);
configMongoose(mongoose);

app.listen(app.get("port"), () => {
  console.log(`start server at port: ${app.get("port")}`);
});
