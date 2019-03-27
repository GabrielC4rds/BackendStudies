const mysql = require('mysql');
const connection =  mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'localhost', 
});

function createTable(conn){
    const sql = "CREATE TABLE IF NOT EXISTS Smartphones (\n"+
                "ID int NOT NULL AUTO_INCREMENT, \n"+
                "Nome varchar(150) NOT NULL,\n"+
                "Marca varchar(150) NOT NULL, \n"+
                "Preco int NOT NULL, \n"+
                "PRIMARY KEY (ID)\n"+
                ");";
    
    conn.query(sql, function(error, results, fields){
        if(error) return console.log(error);
        console.log('criou a tabela');
    });
}

function addRows(conn){
    const sql = "INSERT INTO Smartphones(Nome, Marca, Preco) VALUES ?";
    const values = [
        ['mi8 lite', 'Xiaomi', '1600'],
        ['iphoneX', 'Apple', '4000'],
        ['Galaxy S10', 'Samsung', '3000']
    ];
    conn.query(sql, [values], function(error, results, fields){
        if(error) return console.log(error);
        console.log('adicionou registros');
        conn.end();//fecha a conexão
    });
}


connection.connect(function(err){
    if(err) return console.log(err);
    console.log("conectou!");
    createTable(connection);
    addRows(connection);
})