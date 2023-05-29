import express from "express";
import router from "../routers/index.js";
import cors from "cors";

const version = "/v2";
const port = process.env.PORT || 4000;

const configExpressApp = async (app) => {
  app.set("port", port);
  app.use(cors());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
  });
  app.use(version, router);
  app.get("/", async function (req, res) {
    try {
      res.status(200).json({ message: "OK" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  return app;
};

export default configExpressApp;
