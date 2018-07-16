const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors')
require('./config/db');
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// CORS
const corsOptions = {
  origin: 'http://localhost:8082',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));

// Compression
const compression = require('compression')
function shouldCompress(req, res) {
  if (req.headers['x-no-compression'])
    return false

  return compression.filter(req, res)
}
app.use(compression({ filter: shouldCompress }))

// Routes
const AuthController = require('./src/controllers/auth')
const UserController = require('./src/controllers/user')
const AuthMiddleware = require('./src/middleware/auth')

app.post('/auth/register', AuthController.register)
app.post('/auth/login', AuthController.login)
app.post('/auth/forgot/password', AuthController.forgotPassword)
app.post('/auth/reset/password', AuthController.resetPassword)
app.get('/users/me', AuthMiddleware.verifyToken, UserController.me)
app.post('/users/update', AuthMiddleware.verifyToken, UserController.update)

// authorization
// app.use((req, res, next) => {
//     if (req.session.user) {
//         next();
//     } else {
//         res.status(401).send('Authorization failed! Please login');
//     }
// });

module.exports = app;
