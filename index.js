const express = require("express");
const fs = require("fs");

const app = express();
const port = 3000;

app.use(express.json());


//http://localhost:3000/saudacao?nome=maria. 
app.get("/saudacao",(req,res)=>{
    const nome = req.query.nome; 
   
    if (!nome) {
       return res.status(404).json(
        {
            erro: "Nome não foi informado"
        }
       )
    }
    res.json (
        {
        mensagem: `Saudação ${nome}!`
    }
)
})


//finalzao
app.listen( port,()=> {
    console.log (`Servidor rodando em http://localhost:${port}`)
})