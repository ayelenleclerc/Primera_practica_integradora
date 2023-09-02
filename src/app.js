import express from "express";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import { __dirname } from "./utils.js";
import "./dao/mongo/dbConfig.js";
import ProductManager from "./dao/mongo/managers/productManager.js";
import ChatManager from "./dao/mongo/managers/chatManager.js";

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", `${__dirname}/views`);

//rutas
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

const httpServer = app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
// const prodManager = new ProductManager(__dirname + "/files/products.json");
const socketServer = new Server(httpServer);

const prodManager = new ProductManager();
const chatManager = new ChatManager();

socketServer.on("connection", async (socket) => {
  console.log("Cliente conectado con id: ", socket.id);

  const listProducts = await prodManager.getProducts();
  socketServer.emit("sendProducts", listProducts);

  socket.on("addProduct", async (obj) => {
    await prodManager.addProduct(obj);
    const listProducts = await prodManager.getProducts({});
    socketServer.emit("sendProducts", listProducts);
  });

  socket.on("deleteProduct", async (id) => {
    await prodManager.deleteProduct(id);
    const listProducts = await prodManager.getProducts({});
    socketServer.emit("sendProducts", listProducts);
  });
  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
  socket.on("newUser", (usuario) => {
    console.log("usuario", usuario);
    socket.broadcast.emit("broadcast", usuario);
  });
  socket.on("disconnect", () => {
    console.log(`Usuario con ID : ${socket.id} esta desconectado `);
  });

  socket.on("message", async (info) => {
    // Guardar el mensaje utilizando el MessagesManager
    console.log(info);
    await chatManager.createMessage(info);
    // Emitir el mensaje a todos los clientes conectados
    socketServer.emit("chat", await chatManager.getMessages());
  });
});