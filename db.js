const express = require('express')
const app = express()
app.use(express.json())
const main = require('./index')
let db
main().then(retorno => {
    db = retorno
})

function postAPP(){
app.post('/usuarios', async (req, res) => {
    const {nome, email} = req.body
    try{
        const result = await db.run(`INSERT INTO usuarios (nome, email) VALUES (?, ?)`, [nome, email])
        res.status(201).json(({msg: "Criado com sucesso"}))
    }catch(err){
        res.status(500).json({msg: `${err.message}`})
    }
})
}

function getAPP(){
app.get('/usuarios', async (req, res) => {
    try{
        const result = await db.all(`SELECT * FROM usuarios`)
        res.status(200).json(result)
    }catch(err){
        res.status(500).json({msg: `${err.message}`})
    }
})
}




app.listen(8000, (req, res) => {
    console.log("servidor online")
})