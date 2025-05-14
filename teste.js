const sqlite = require('sqlite3')
const db = new sqlite.Database('./banco.db')

async function conectar(){
    const db = await open({
        filename:'./banco.db',
        driver:sqlite.Database
    })
    setup()
}

function setup(){
    db.exec(`CREATE TABLE IF NOT EXISTS usuarios(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE
    )`)

    db.exec(`CREATE TABLE IF NOT EXISTS tarfas(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario_id INTEGER NOT NULL,
        descricao TEXT NOT NULL,
        status TEXT NOT NULL,
        FOREIGN KEY(usuario_id) REFERENCES usuarios(id)
    )`)
}
