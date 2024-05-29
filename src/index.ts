import express from "express";
import { createServer } from "http";
import Socket from "./base/classes/Socket";
import mongoose from "mongoose";
import router from "./routes/index";

const app = express();
const port: number = 3000;

const server = createServer(app);

Socket.start(server);

app.use(express.json());

app.use(router);

server.listen(port, "0.0.0.0", () => {
  console.log(`Http сервер запущен на ${port} порту!`);
});

mongoose.connect("mongodb://cabuser:1Ht0XEC2zbWA@192.168.0.30:27017/cab");

mongoose.connection.on("connected", () => {
  console.log("База данных подключена!");
});
