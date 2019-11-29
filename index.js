const express = require('express')
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3001;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
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
app.get('/users', (req, res) => {
  res.json(users)
})
app.get('/register', (req, res) => {
  res.sendFile('register.html', { root: path.join(__dirname, './view') });
});
app.post('/register', async (req, res) => {
  
  try {
    const user = { name: req.body.name, password: req.body.password, email:req.body.email }
    
    let checkUser = users.find(user => user.email == req.body.email)  
    
    if(checkUser) {
      res.status(400).send("400");
      return false;
    }
    
    users.push(user)
    res.status(201).send("201");

  } catch (err) {
    res.status(500).send("500");
  }
});

app.get('/login', (req, res) => {
  res.sendFile('login.html', { root: path.join(__dirname, './view') });
});
app.post('/login', async (req, res) => {
  const user = users.find(user => user.name === req.body.name)
  if (user == null) {
    return res.status(401).send("401");
  }
  try {
    if (user.pass == req.body.password) {
      res.status(200).send("200")
    } else {
      res.status(400).send("400");
    }
  } catch (err) {
    res.status(500).send("500");
  }
});

app.listen(PORT)