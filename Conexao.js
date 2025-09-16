const { Pool } = require("pg");

const dadosConexao = {
  host: "localhost",
  port: 5432,
  database: "ads042",
  user: "postgres",
  password: "123456", 
};

class Conexao {
  static #pool = new Pool(dadosConexao);
  static async query(sql) {
    try {
      const resultado = await this.#pool.query(sql);
      return resultado.rows;
    } catch (error) {
      console.error("Erro ao executar a query:", error);
      return [];
    }
  }
}

module.exports = Conexao;