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
  telephone: {
    type: Number,
    required: false
  },
  avatar: {
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
}, {
  runSettersOnQuery: true,
  toObject: {
    transform: (doc, ret) => {
      delete ret.__v
      delete ret.createdAt
      delete ret.passKeyExpires
      delete ret.passResetKey
    }
  }
}) // 'runSettersOnQuery' is used to implement the specifications in our model schema such as the 'trim' option.)

userSchema.pre('save', function(next) {
  this.username = this.username.toLowerCase()

  if (!this.avatar)
    this.avatar = 'https://randomuser.me/api/portraits/men/85.jpg'

  if (!this.fullName)
    this.fullName = 'Unknown'

  const currentDate = new Date().getTime()
  this.updatedAt = currentDate
  if (!this.createdAt) {
    this.createdAt = currentDate
  }

  next()
})

const user = mongoose.model('users', userSchema)

module.exports = user