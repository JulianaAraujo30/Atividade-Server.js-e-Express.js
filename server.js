const express = require("express");
const Conexao = require("./Conexao.js");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Servidor executando. Use as rotas: /usuarios ou /cep/numero_do_cep");
});


app.get("/usuarios", async (req, res) => {
  try {
    const usuarios = await Conexao.query("SELECT * FROM usuarios");
    console.log("Usuários encontrados:", usuarios);
    res.json(usuarios);
  } catch (error) {
    console.error("Erro ao buscar usuarios:", error);
    res.status(500).json({ erro: "Ocorreu um erro ao buscar os usuarios." });
  }
});

app.get("/cep/:cep", async (req, res) => {
  try {
  
    const { cep } = req.params;

  
    const urlApi = `https://viacep.com.br/ws/${cep}/json/`;
    const response = await fetch(urlApi);
    const data = await response.json(); 


    if (data.erro) {
      return res.status(404).json({ erro: "CEP não encontrado." });
    }
    

    res.json(data);
  } catch (error) {
    console.error("Erro ao consultar o CEP:", error.message);
    res.status(500).json({
      erro: "Ocorreu um erro ao consultar o CEP."
    });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});