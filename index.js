const express = require('express')
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3000;

app.use(function (req, res, next) {
  req.header("Access-Control-Allow-Origin", "*");
  req.header('Access-Control-Allow-Methods', '*');
  req.header('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization');
  next();
});

app.use(express.json())

const users = [];

app.get('/perfil', (req, res) => {
  res.sendFile('perfil.html', { root: path.join(__dirname, './view') });
});

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, './view') });
});

app.get('/login', (req, res) => {
  res.sendFile('login.html', { root: path.join(__dirname, './view') });
});

app.get('/users', (req, res) => {
  res.json(users)
})

app.get('/register', (req, res) => {
  res.sendFile('register.html', { root: path.join(__dirname, './view') });
});
app.post('/register' , (req, res) => {
  
  if(!req.body.name || !req.body.email || !req.body.password) {
    return res.status(400).send({"data":"precisa preencher nome, email e senha"});
  }

  const found = users.find(item => item.email === req.body.email);

  if(found)
    return res.status(400).send({"data":"e-mail já está sendo utilizado!"});

  const user = {
    name: req.body.name,
    email: req.body.email,
    password:req.body.password
  }

  users.push(user);
  return res.status(201).send({"data":"criado com sucesso"});   
});



app.post('/login', async (req, res) => {
  const found = users.find(item => item.email === req.body.email);

  if(!found) {
    return res.status(404).send({"data":"usuário não localizado"});
  
  } else {

    if(found.password === req.body.password &&
       found.email === req.body.email ) {
        return res.status(200).send({"data":"login autorizado"});

    } else {
      return res.status(404).send({"data":"check suas credênciais"});
    
    }

  }

});

app.listen(PORT)