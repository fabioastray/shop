const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser')

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

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

const user = require('./models/user')

// Routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
