const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser')
const session = require('express-session')
const cors = require('cors')

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
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

// Connect to DB
const mongoose =  require('mongoose')
/**
 * https://mlab.com, user: rockastray@gmail.com, pass: unforgiven123
 */
const options = {
  user: 'root',
  pass: 'root123'
}
mongoose.connect('mongodb://ds221271.mlab.com:21271/shop-schema', options)
        .then(() => {
            console.log('Connected to db')
        }, (err) => {
          console.log('Could not connect to db', err)
        })

// configure bodyParser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// session management
app.use(
    session({
      secret: 'mysecrethash',
      resave: true,
      saveUninitialized: false
    })
)

// Routes
const userController = require('./src/controllers/userController');
app.post('/auth/signup', userController.signup)
app.post('/auth/login', userController.login)
app.get('/:userId', userController.findOne)


// authorization
// app.use((req, res, next) => {
//   if (req.session.user) {
//     next();
//   } else {
//     res.status(401).send('Authorization failed! Please login');
//   }
// });

module.exports = app;
