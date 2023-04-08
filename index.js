import express from "express";
import cors from "cors";
import {} from "dotenv/config";
import dayjs from "dayjs";

const port = process.env.PORT || 4000;
const app = express();
const version = "/v1";

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(version, router);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});
app.listen(port, () => {
  console.log(`start server at port: ${port}`);
});