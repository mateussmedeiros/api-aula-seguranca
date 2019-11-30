var express = require('express'),
app = express()
const bodyParser = require('body-parser')
const path = require('path');
const lowdb = require('lowdb');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

db.defaults({ users:[] }).write();


const PORT = process.env.PORT || 3000;

app.use(function (req, res, next) {
  req.header("Access-Control-Allow-Origin", "*");
  req.header('Access-Control-Allow-Methods', '*');
  req.header('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization');
  next();
});




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
  
  if(req.body.name == "" || req.body.email == "" || req.body.password == "")
    return res.send({'data':'preencha todos os campos', 'status':'400'}).status(400);


  const found = db.get('users')
                  .find({ 
                    email:req.body.email 
                  })
                  .value();
  if(found)
    return res.send({'data':'email já em uso no sistema', 'status':'400'}).status(400)
                  
    db.get('users')
    .push({
      name : req.body.name,
      email : req.body.email,
      password : req.body.password 
    })
    .write();

    return res.send({'data':'criado com sucesso', 'status':'201'}).status(201);
  
 
});

app.post('/login', async (req, res) => {
 
  if(req.body.name == "" || req.body.email == "" || req.body.password == "")
    return res.send({'data':'preencha todos os campos','status':'400'}).status(400);

  const found = db.get('users')
                  .find({ 
                    email:req.body.email ,
                    password:req.body.password
                  })
                  .value();
  if(!found) 
    return res.send({'data':'usuário não encontrado','status':'404'}).status(404);

 return res.send({'data':'login autorizado'}).status(200);
});

app.listen(PORT)