const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

  
app.use(express.json())

const users = [];

app.get('/', (req, res) => {
    res.json('Api aula de segurança da informação V1.0');
});

app.get('/users', (req, res) => {
  res.json(users)
})

app.post('/register', async (req, res) => {
  try {
    const user = { name: req.body.name, password: hashedPassword }
    users.push(user)
    res.status(201).send("Usuário criado com sucesso!")
  } catch {
    res.status(500).send("Ops..., houve um erro!")
  }
});

app.post('/login', async (req, res) => {
  const user = users.find(user => user.name === req.body.name)
  if (user == null) {
    return res.status(400).send('Usuário não localizado');
  }
  try {
    if(user.pass == req.body.password) {
      res.send('Bem vindo!' + user.name)
    } else {
      res.send('Por favor, verifique suas credênciais!');
    }
  } catch {
    res.status(500).send()
  }
})

app.listen(PORT)