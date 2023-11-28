import express from "express";
import router from "./src/routes/routes";
import { createServer } from "node:http";
import morgan from "morgan";
import { engine } from "express-handlebars";
import { Server as IOServer } from "socket.io";
const server = express();
const port = 3001;

//HANDLEBAR
server.engine("hbs", engine({ extname: ".hbs" }));
server.set("views", "./views");
server.set("view engine", "hbs");
server.use(
  "/static",
  express.static("./static", {
    setHeaders: (res) => res.setHeader("Content-Type", "text/javascript"),
  })
);

//EXPRESS SERVER
const httpServer = createServer(server);
server.set("engine", engine());
server.use(morgan("dev"));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use("/", router);
const serverListener = httpServer.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
const ioServer = new IOServer(serverListener);
ioServer.on("connection", (socket) => {
  console.log("new connection: ", socket.id);
  socket.emit("message", "test message");
});

export default httpServer;
