const express = require('express')
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3000;

app.use(function (request, res, next) {
  request.header("Access-Control-Allow-Origin", "*");
  request.header('Access-Control-Allow-Methods', '*');
  request.header('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization');
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
app.post('/register' , (request, response) => {
  try {
    const user = { 
                    name:request.body.name, 
                    password:request.body.password, 
                    email:request.body.email 
                 }

    if(user == null || user == "") {
      response
      .status(401)
    }

    let checkUser = null;
    
    checkUser = users.find(user => user.email === request.body.email)  
    
    if(checkUser == null || checkUser == "") {
      response
      .status(400)
    }

    users.push(user);
    response.status(201)

  } catch(error) {
    response
    .status(500)
  }
});



app.get('/login', (req, res) => {
  res.sendFile('login.html', { root: path.join(__dirname, './view') });
});
app.post('/login', async (req, res) => {
  const user = users.find(user => user.email === req.body.email)
  
  if (user == null) {
    return res.send("Usuário não localizado").status(401);
  }
  
  try {
    if (user.pass == req.body.password) {
      res.send("Successo!").status(200);
    } else {
      res.send("Error").status(400);
    }
  } catch (err) {
      res.status(500);
  }

});

app.listen(PORT)