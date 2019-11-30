const express = require('express')
const app = express();

const path = require('path');
const lowdb = require('lowdb');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

db.defaults({ users:[] }).write();


const PORT = process.env.PORT || 3000;

app.use(function (req, res, next) {
  req.header("Access-Control-Allow-Origin", "*");
  req.header('Access-Control-Allow-Methods', '*');
  req.header('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization');
  next();
});

app.use(express.json())


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

app.post('/register' , async (req, res) => {
  try {
    const user = { name: req.body.name, password: req.body.password, email:req.body.email }
    return res.send(user);
    db.get('users')
    .push({name:name ,email: email,password: password})
    .write()

  } catch (err) {
    res.status(500).send("Ops..., houve um erro!")

    res.status(500).send(err)

  }
 
});



app.post('/login', async (req, res) => {
  res.send(req.body.email)

});

app.listen(PORT)