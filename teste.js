const sqlite = require('sqlite3')
const {open} = require('sqlite')
const express = require('express')
const app = express()
app.use(express.json())
let db

async function conectar(){
    db = await open({
        filename:'./banco.db',
        driver:sqlite.Database
    })
    return db
}

async function setup(){
    db = await conectar()
    await db.exec(`CREATE TABLE IF NOT EXISTS usuarios(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE
    )`)

    await db.exec(`CREATE TABLE IF NOT EXISTS tarfas(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario_id INTEGER NOT NULL,
        descricao TEXT NOT NULL,
        status TEXT NOT NULL,
        FOREIGN KEY(usuario_id) REFERENCES usuarios(id)
    )`)
}

setup().then(() =>{
    usuarios()
    tarefas()
    app.listen(8000, (req, res) => {
        console.log("servidor online")
    })
})

function usuarios(){
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

function tarefas(){
    app.post('/tarefas', async (req, res) => {
        const {usuario_id, descricao, status} = req.body
        try{
            const result = await db.run(`INSERT INTO tarefas (usuario_id, descricao, status) VALUES (?, ?, ?)`, [usuario_id, descricao, status])
            res.status(201).json(({msg: "Criado com sucesso"}))
        }catch(err){
            res.status(500).json({msg: `${err.message}`})
        }
    })
}