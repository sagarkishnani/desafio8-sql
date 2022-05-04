const { promises: fs } = require("fs");

class ContenedorArchivo {
  constructor(ruta) {
    this.ruta = ruta;
  }

  async listar(id) {
    try {
      const elements = await this.listarAll();
      let element = elements.find((el) => el.id == id);
      element ? element : null;
    } catch {
      console.log("Error al buscar elemento por ID");
    }
  }

  async listarAll() {
    try {
      let messages = await fs.readFile(`${this.ruta}`, "utf-8");
      return JSON.parse(messages);
    } catch (err) {
      console.log(`Error al leer los mensajes: ${err}`);
      return [];
    }
  }

  async guardar({ username, message, fyh }) {
    try {
      let resultado = await this.listarAll();

      let ids = 1;
      if (resultado.length > 0) {
        ids = resultado[resultado.length - 1].id + 1;
      }

      resultado.push({ username, message, fyh, id: ids });

      await fs.writeFile(`${this.ruta}`, JSON.stringify(resultado));
      return console.log(resultado);
    } catch (err) {
      console.log(`Error al guardar el Item: ${err}`);
    }
  }

  async actualizar(elem, id) {
    try {
      let elements = await this.listarAll();

      const foundIndex = elements.findIndex((el) => el.id == id);

      if (foundIndex !== -1) {
        elements[foundIndex] = { id, ...elem };
        await fs.writeFile(`${this.ruta}`, JSON.stringify(elements));
      } else {
        console.log("Hubo un error al buscar el elemento");
      }
    } catch (error) {
      console.log(`Error al guardar el Item: ${err}`);
    }
  }

  async borrar(id) {
    let elements = await this.listarAll();
    const element = elements.find((el) => el.id === id);
    const index = elements.indexOf(element);
    elements.splice(index, 1);

    await fs.writeFile(`${this.ruta}`, JSON.stringify(elements));
  }

  async borrarAll() {
    fs.unlink(`${this.ruta}`, (err) => {
      err
        ? console.log(`Error al borrar archivo: ${err}`)
        : console.log(`Archivo borrado con éxito`);
    });
  }
}

module.exports = ContenedorArchivo;
