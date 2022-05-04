class ContenedorMemoria {
  constructor() {
    this.productos = [];
    this.id = 0;
  }

  listar(id) {
    const prod = this.productos.find((prod) => prod.id == id);
    return prod || { error: "producto no encontrado" };
  }

  listarAll() {
    return [...this.productos];
  }

  guardar({ title, price, thumbnail }) {
    const producto = {
      id: this.productos.length + 1,
      title: title,
      price: price,
      thumbnail: thumbnail,
    };
    this.productos.push(producto);
  }

  actualizar(elem, id) {}

  borrar(id) {}

  borrarAll() {}
}

module.exports = ContenedorMemoria;
