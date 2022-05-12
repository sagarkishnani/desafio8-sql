import knex from "knex";
import config from "../src/config.js";
//------------------------------------------
// productos en MariaDb

try {
  //conexión
  // eliminar tabla si existe
  // crear tabla
  knex(config.mariaDb)
    .schema.dropTableIfExists("productos")
    .finally(() => {
      knex(config.mariaDb).schema.createTable("productos", (table) => {
        table.increments("id").primary();
        table.string("title", 50).notNullable();
        table.float("price");
        table.string("thumbnail", 250);
      });
    });

  // destruir conexión
  knex(config.mariaDb).destroy();

  console.log("tabla productos en mariaDb creada con éxito");
} catch (error) {
  console.log("error al crear tabla productos en mariaDb");
  console.log(error);
}

//------------------------------------------
// mensajes en SQLite3
try {
  //conexión
  // eliminar tabla si existe
  // crear tabla
  knex(config.sqlite3)
    .schema.dropTableIfExists("mensajes")
    .finally(() => {
      knex(config.sqlite3).schema.createTable("mensajes", (table) => {
        table.increments("id").primary();
        table.string("username", 50).notNullable();
        table.string("message", 250);
        table.string("fyh", 50);
      });
    });
  // destruir conexión

  knex(config.sqlite3).destroy();

  console.log("tabla mensajes en sqlite3 creada con éxito");
} catch (error) {
  console.log("error al crear tabla mensajes en sqlite3");
}
