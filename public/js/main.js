const socket = io.connect();

//------------------------------------------------------------------------------------

const formAgregarProducto = document.getElementById("formAgregarProducto");
formAgregarProducto.addEventListener("submit", (e) => {
  e.preventDefault();

  const producto = {
    title: document.getElementById("nombre").value,
    price: document.getElementById("precio").value,
    thumbnail: document.getElementById("foto").value,
  };
  socket.emit("new-product", producto);
  return false;
});

socket.on("productos", (productos) => {
  makeHtmlTable(productos).then((html) => {
    document.getElementById("productos").innerHTML = html;
  });
});

function makeHtmlTable(productos) {
  return fetch("plantillas/tabla-productos.hbs")
    .then((respuesta) => respuesta.text())
    .then((plantilla) => {
      const template = Handlebars.compile(plantilla);
      const html = template({ productos });
      return html;
    });
}

//-------------------------------------------------------------------------------------

const inputUsername = document.getElementById("inputUsername");
const inputMessage = document.getElementById("inputMensaje");
const btnEnviar = document.getElementById("btnEnviar");

const formPublicarMensaje = document.getElementById("formPublicarMensaje");

const hoy = new Date();

formPublicarMensaje.addEventListener("submit", (e) => {
  e.preventDefault();

  if (inputUsername.value.length !== 0) {
    const message = {
      username: inputUsername.value,
      message: inputMessage.value,
      fyh: hoy.toUTCString(),
    };
    socket.emit("new-message", message);
    return false;
  } else alert("Debes ingresar tu email para poder chatear");
});

socket.on("messages", (messages) => {
  makeHtmlList(messages).then((html) => {
    document.getElementById("messages").innerHTML = html;
  });
});

function makeHtmlList(messages) {
  return fetch("plantillas/lista-mensajes.hbs")
    .then((respuesta) => respuesta.text())
    .then((plantilla) => {
      const template = Handlebars.compile(plantilla);
      const html = template({ messages });
      return html;
    });
}
