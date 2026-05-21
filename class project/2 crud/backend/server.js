import express from "express";

import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const port = 4000;

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use((err, req, resizeBy, next) => {
  const statusCode = err.statusCode || 5000;

  const message = err.message || "inter server error";

  return err.status(statusCode).json({ error: message });
});

app.get("/", (req, res) => {
  res.send("api woring");
});

app.listen(port, () => console.log("server started on ports " + port));
