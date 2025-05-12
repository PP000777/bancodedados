const sqlite = require('sqlite3')
const {open} = require('sqlite')
//criar uma conexão com o banco

async function main() {
    try{
    const db = await open({
        filename:'./banco.db',
        driver:sqlite.Database
})
await db.exec(`CREATE TABLE usuarios(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE
)`)

await db.close()
}catch(err){
    console.log(err)
}
}
main()


//executar um script simples de criação de tabela
    
//executar um script simples de leitura na tabela
//encerrar a conexão