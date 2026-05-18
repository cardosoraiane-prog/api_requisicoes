const express = require("express");
const fs = require("fs");

const app = express();
const cors = require("cors");
    app.use(cors());
const port = 3000;

app.use(express.json());


//http://localhost:3000/saudacao?nome=maria 
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

app.post("/imc",(req,res) => {
    const { nome, idade, altura, peso}= req.body;
    
    if(!nome || !idade || !altura || !peso){
      return res .status(404).json({erro:"Dados incompletos"})
    }
   
    const imc = peso / (altura * altura);

    res.json({
        nome,
        idade,
        imc:  imc.toFixed(2)
    })
})

app.post("/media",(req,res) => {
    const {nome,nota1,nota2 }= req.body 

    if (!nome || !nota1 || !nota2  ){
        return res .status(404).json({erro:"dados incompletas"})
    }

    const  media = ( parseFloat(nota1)+ parseFloat(nota2))/2 

    res.json({
        nome,
        nota2,
        mensagem: media >=7 ? "aprovado": "reprovado",
        media:parseFloat(media)
    })
})
//finalzao
app.listen( port,()=> {
    console.log (`Servidor rodando em http://localhost:${port}`)
})