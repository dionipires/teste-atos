const fs = require('fs')
const bodyParser = require('body-parser')
const jsonServer = require('json-server')
const jwt = require('jsonwebtoken')

const server = jsonServer.create()
const router = jsonServer.router('./database.json')
const userdb = JSON.parse(fs.readFileSync('./users.json', 'UTF-8'))

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(jsonServer.defaults());

const SECRET_KEY = '123456789'
const expiresIn = '1h'

// Função para criar um token a partir de um payload
function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn })
}

// Função para verificar o token
function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY, (err, decode) => decode !== undefined ? decode : err)
}

// Função para verificar se o usuário está autenticado
function isAuthenticated({ email, password }) {
  const userdb = JSON.parse(fs.readFileSync('./users.json', 'UTF-8'));
  return userdb.users.findIndex(user => (user.email === email || user.nome === email) && user.password === password) !== -1;
}

// Rota para registrar um novo usuário
server.post('/auth/register', (req, res) => {
  console.log("register endpoint called; request body:");
  console.log(req.body);
  const { nome, email, password } = req.body;

  if (isAuthenticated({ email, password }) === true) {
    const status = 401;
    const message = 'E-mail e senha já existem';
    res.status(status).json({ status, message });
    return;
  }

  fs.readFile("./users.json", (err, data) => {
    if (err) {
      const status = 401
      const message = err
      res.status(status).json({ status, message })
      return
    }

    // Obter os dados atuais dos usuários
    var data = JSON.parse(data.toString());

    // Obter o ID do último usuário
    var last_item_id = data.users[data.users.length - 1].id;

    // Adicionar novo usuário
    data.users.push({ id: last_item_id + 1, nome: nome, email: email, password: password }); // Incluir o campo "nome"
    var writeData = fs.writeFile("./users.json", JSON.stringify(data), (err, result) => {
      if (err) {
        const status = 401
        const message = err
        res.status(status).json({ status, message })
        return
      }
    });
  });

  // Criar token para novo usuário
  const access_token = createToken({ email, password })
  console.log("Access Token:" + access_token);
  res.status(200).json({ access_token })
})

// Rota para fazer login
server.post('/auth/login', (req, res) => {
  console.log("login endpoint called; request body:");
  console.log(req.body);
  const { email, password } = req.body;
  if (isAuthenticated({ email, password }) === false) {
    const status = 401
    const message = 'Incorrect email or password'
    res.status(status).json({ status, message })
    return
  }
  const access_token = createToken({ email, password })
  console.log("Access Token:" + access_token);
  res.status(200).json({ access_token })
})

// Rota para obter detalhes do usuário com base no token de acesso
server.get('/auth/user', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = verifyToken(token);
  if (decodedToken) {
    const { email } = decodedToken;
    const user = userdb.users.find(user => user.email === email);
    if (user) {
      res.status(200).json({ nome: user.nome });
    } else {
      res.status(404).json({ message: 'Usuário não encontrado' });
    }
  } else {
    res.status(401).json({ message: 'Não autorizado' });
  }
});


// Middleware para verificar o token em rotas protegidas
server.use(/^(?!\/auth).*$/, (req, res, next) => {
  if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
    const status = 401
    const message = 'Error in authorization format'
    res.status(status).json({ status, message })
    return
  }
  try {
    let verifyTokenResult;
    verifyTokenResult = verifyToken(req.headers.authorization.split(' ')[1]);

    if (verifyTokenResult instanceof Error) {
      const status = 401
      const message = 'Access token not provided'
      res.status(status).json({ status, message })
      return
    }
    next()
  } catch (err) {
    const status = 401
    const message = 'Error access_token is revoked'
    res.status(status).json({ status, message })
  }
})

// Rotas para manipulação de produtos
server.get('/products', (req, res) => {
  const products = JSON.parse(fs.readFileSync('./products.json'));
  res.status(200).json(products);
});

server.post('/products', (req, res) => {
  const products = JSON.parse(fs.readFileSync('./products.json'));
  const newProduct = req.body;
  newProduct.id = products.length + 1;
  products.push(newProduct);
  fs.writeFileSync('./products.json', JSON.stringify(products));
  res.status(201).json(newProduct);
});

server.put('/products/:id', (req, res) => {
  const products = JSON.parse(fs.readFileSync('./products.json'));
  const productId = parseInt(req.params.id);
  const updatedProduct = req.body;
  const index = products.findIndex(product => product.id === productId);
  if (index !== -1) {
    products[index] = { ...products[index], ...updatedProduct };
    fs.writeFileSync('./products.json', JSON.stringify(products));
    res.status(200).json(products[index]);
  } else {
    res.status(404).json({ message: 'Produto não encontrado' });
  }
});

server.delete('/products/:id', (req, res) => {
  const products = JSON.parse(fs.readFileSync('./products.json'));
  const productId = parseInt(req.params.id);
  const index = products.findIndex(product => product.id === productId);
  if (index !== -1) {
    products.splice(index, 1);
    fs.writeFileSync('./products.json', JSON.stringify(products));
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Produto não encontrado' });
  }
});

server.use(router)

server.listen(8000, () => {
  console.log('Execute o servidor API de autenticação')
})
