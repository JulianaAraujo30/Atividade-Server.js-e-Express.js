const express = require('express');
const app = express();

app.get('/users', (req, res) => {
    const users = {
        nome: "Juliana Araujo",
        idade: "25"
    };
    res.status(200).json(users);
});

app.listen(8081, () => console.log("Rodando express na url http://localhost:8081"));
