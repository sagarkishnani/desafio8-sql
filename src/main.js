import express from "express";

import { Server as HttpServer } from "http";
import { Server as Socket } from "socket.io";

import ContenedorSQL from "./contenedores/ContenedorSQL.js";

import config from "./config.js";

//--------------------------------------------
// instancio servidor, socket y api

const app = express();
const httpServer = new HttpServer(app);
const io = new Socket(httpServer);

const productosApi = new ContenedorSQL(config.mariaDb, "productos");
const mensajesApi = new ContenedorSQL(config.sqlite3, "mensajes");

//--------------------------------------------
// configuro el socket

io.on("connection", async (socket) => {
  console.log("Nuevo cliente conectado!");

  // carga inicial de productos
  socket.on("new-product", (producto) => {
    productosApi.guardar(producto);
    io.sockets.emit("productos", productosApi.listarAll());
  });
  // actualizacion de productos
  socket.emit("productos", productosApi.listarAll());

  // carga inicial de mensajes
  socket.on("new-message", (message) => {
    mensajesApi.guardar(message);
    io.sockets.emit("messages", mensajesApi.listarAll());
  });
  // actualizacion de mensajes
  socket.emit("messages", await mensajesApi.listarAll());
});

//--------------------------------------------
// agrego middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//--------------------------------------------
// inicio el servidor

const PORT = 8080;
const connectedServer = httpServer.listen(PORT, () => {
  console.log(
    `Servidor http escuchando en el puerto ${connectedServer.address().port}`
  );
});
connectedServer.on("error", (error) =>
  console.log(`Error en servidor ${error}`)
);
