import knex from "knex";

class ContenedorSQL {
  constructor(config, tabla) {
    this.knex = knex(config);
    this.tabla = tabla;
  }

  async listar(id) {
    await knex
      .from(`${this.tabla}`)
      .select("id")
      .where("id", "=", id)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
        throw err;
      })
      .finally(() => {
        this.desconectar();
      });
  }

  async listarAll() {
    await knex
      .from(`${this.tabla}`)
      .select("*")
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
        throw err;
      })
      .finally(() => {
        this.desconectar();
      });
  }

  async guardar(elem) {
    await knex(`${this.tabla}`)
      .insert(elem)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
        throw err;
      })
      .finally(() => {
        this.desconectar();
      });
  }

  async actualizar(elem, id) {
    await knex(`${this.tabla}`)
      .where("id", id)
      .update({ elem })
      .then(() => console.log("Registro actualizado"))
      .catch((err) => {
        console.log(err);
        throw err;
      })
      .finally(() => {
        this.desconectar();
      });
  }

  async borrar(id) {
    await knex(`${this.tabla}`)
      .where("id", "=", id)
      .del()
      .then(() => console.log("Registro eliminado"))
      .catch((err) => {
        console.log(err);
        throw err;
      })
      .finally(() => {
        this.desconectar();
      });
  }

  async borrarAll() {
    await knex(`${this.tabla}`)
      .del()
      .then(() => console.log("Tabla eliminada"))
      .catch((err) => {
        console.log(error);
        throw err;
      })
      .finally(() => {
        this.desconectar();
      });
  }

  async desconectar() {
    await this.knex.destroy();
  }
}

export default ContenedorSQL;
