
// dependências
const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(express.json());
app.use(cors());

// vamos executar o servidor/ funcionando!
// instalar no terminal   node index.js
app.listen(3002, () => {
    console.log('Server is running on port 3002');
})

// vamos criar o database (mysql)
const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '' , // se vc colocou senha no xampp coloque aqui.
    database:'plantdb',
})

// vamos agora criar uma rota para o servidor que irá registrar um usuário


app.post('/register', (req, res) =>{ 

    // precisamos obter variáveis enviadas do formulário
    // aqui passamos as informaçoes do Register => Axios.post -- const cerateUsers
    const sentEmail =  req.body.Email                                                                                                                                                                                        
    const sentUserName = req.body.UserName
    const sentPassword = req.body.Password 

    // vamos criar uma instrução sql para inserir o usuário na tabela do banco de dados Usuários
    const SQL = 'INSERT INTO users(email, username, password) VALUES (?,?,?)'
    //vamos inserir esses valores através de uma variável
    const Values = [ sentEmail, sentUserName, sentPassword]

    // consulta para executar a instrução sql indicada acima
    db.query(SQL, Values, (err, results) => {
        if(err){
            res.send(err)
        }
        else{
            console.log('usuário inserido com sucesso!')
            res.send({message:'usuário cadastrado'})
            //vamos tentar ver
            //usuário não foi enviado, precisamos usar Express e cors
        }
    })
})

// agora precisamos fazer login com essas credenciais de um usuário registrado
// vamos criar outra rota

app.post('/login', (req, res) => {
    // precisamos obter variáveis enviadas do formulário
    // aqui passamos as informaçoes do Register => Axios.post -- const createUsers                                                                                                                                                                             
    const sentLoginUserName = req.body.LoginUserName
    const sentLoginPassword = req.body.LoginPassword 

    // vamos criar uma instrução sql para inserir o usuário na tabela do banco de dados Usuários
    const SQL = 'SELECT * FROM users WHERE username = ? && password = ? '
    //vamos inserir esses valores através de uma variável
    const Values = [ sentLoginUserName, sentLoginPassword]

     // consulta para executar a instrução sql indicada acima
     db.query(SQL, Values, (err, results) => {
        if(err){
            res.send({error: err})
        }
        if(results.length > 0){
            res.send(results)
        }
        else{
            res.send({message:`Senha ou Usuário não cadastrado`})
            //vamos tentar ver
            //isso deve ser bom, vamos tentar fazer login
        }
    })
})

