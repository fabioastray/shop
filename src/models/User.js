const mongoose =  require('mongoose')
const Schema = mongoose.Schema

let userSchema = new Schema({
  fullName: {
    type: String,
    required: false,
    trim: true
  },
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: false
  },
  passResetKey: String,
  passKeyExpires: Number,
  createdAt: {
    type: Date,
    required: false
  },
  updatedAt: {
    type: Date,
    required: false
  }
}, { runSettersOnQuery: true }) // 'runSettersOnQuery' is used to implement the specifications in our model schema such as the 'trim' option.)

userSchema.pre('save', function(next) {
  this.username = this.username.toLowerCase()

  const currentDate = new Date().getTime()
  this.updatedAt = currentDate
  if (!this.createdAt) {
    this.createdAt = currentDate
  }

  next()
})

const user = mongoose.model('users', userSchema)

module.exports = user