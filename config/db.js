// Connect to DB
const mongoose =  require('mongoose')
/**
 * https://mlab.com, user: rockastray@gmail.com, pass: Unforgiven123
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