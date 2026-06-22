const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path=require("path");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

const clientesFile=path.join(__dirname,"clientes.josn")

function salvarClientes(clientes){
    fs.writeFileSync(clientesFile , JSON.stringify(clientes, null,2),"utf8")
}

function lerClientes(){
if(!fs.existsSync(clientesFile)){
    return[];
}
const dados=fs.readFileSync(clientesFile,'utf-8')
try{
    return JSON.parse(dados) || [];
}
catch(e){
         return []
    }
}

app.post('/clientes',(req,res)=> {
    const{nome,cpf,cep,rua,cidade,estado,numero}=req.body;
    if(!nome || !cpf || !cep){
        return res.status(404).json({erro: "dados incompletos"})
    }
    const clientes= lerClientes();
    if(clientes.some(c => c.cpf===cpf )){
        return res.status(400).json({erro:"cliente ja cadastrado"})
    }
    const novoCliente={nome,cpf,cep,rua,cidade,estado,numero};
    clientes.push(novoCliente);
    salvarClientes(clientes);
    return res.status(201).json({mensagem:"cliente cadastrados com suseso"})
})

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

app.post("/cadastro",(req,res) => {

    const { nome, cpf, cep, }= req.body;
    
    if(!nome || !cpf || !cep ){
      return res .status(404).json({erro:"Dados incompletos"})
    }
   

    res.json({
        nome,
       cpf,
       cep
       
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
        media: parseFloat(media)
    })
})

app.post("/login",(req,res) => {
    const {email,senha }= req.body 

    if (!email || !senha  ){
        return res.status(404).json({erro:"dados incompletas"})
    }
    if(email=="admin@admin.com"&& senha=="123456"){
        res.json({token:"123456"})

    }else{
        return res.status(404).json({erro:"usuario não incontrado"})
    }
  
})
//finalzao
app.listen( port,()=> {
    console.log (`Servidor rodando em http://localhost:${port}`)
})