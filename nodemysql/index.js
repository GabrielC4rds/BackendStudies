const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const mysql = require('mysql');

//Configurando o body parser para pegar POST mais tarde
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//definindo as rotas
const router = express.Router();
router.get('/', (req, res) => res.json({ message: 'Funcionando' }));
router.get('/smartphones', (req, res) => {
    execSQLQuery('SELECT * FROM Smartphones', res);
})
router.get('/smartphones:id?', (req, res) => {
    let filter = '';
    if(req.params.id) filter = ' WHERE ID=' + parseInt(req.params.id);
    execSQLQuery('SELECT * FROM Smartphones' + filter, res);
})
app.use('/', router);

//inicia o servidor
app.listen(port);
console.log('API funcionando!');


function execSQLQuery(sqlQry, res){
    const connection = mysql.createConnection({
        host: '127.0.0.1',
        port: '3306',
        user: 'root',
        password: 'root',
        database: 'localhost',  
    });

    connection.query(sqlQry, function(error, results, fields){
        if(error)
            releaseEvents.json(error);
        else
            res.json(results);
        connection.end();
        console.log('executou!');
    });
}