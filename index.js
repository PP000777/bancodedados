const sqlite = require('sqlite3')
const {open} = require('sqlite')
//criar uma conexão com o banco

async function main() {
    try{
    const db = await open({
        filename:'./banco.db',
        driver:sqlite.Database
})
await db.exec(`CREATE TABLE IF NOT EXISTS usuarios(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE
)`)

return db
}catch(err){
    console.log(err)
}
}

module.exports = main

