const mongoose =  require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

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
    destination: {
      type: String
    },
    filename: {
      type: String
    },
    mimetype: {
      type: String
    },
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
  toJSON: {
    transform: (doc, ret) => {
      delete ret.__v
      delete ret.createdAt
      delete ret.passKeyExpires
      delete ret.passResetKey
      delete ret.password

      let avatar = {}

      if (ret.avatar) {
        avatar = {
          url: `${ret.avatar.destination}/${ret.avatar.filename}`
        }
      } else {
        const gender = !ret.gender ? 'lego' : ret.gender === 'M' ? 'men' : 'women'
        avatar = {
          url: `https://randomuser.me/api/portraits/${gender}/1.jpg`
        }
      }

      ret.avatar = avatar;
    }
  }
}) // 'runSettersOnQuery' is used to implement the specifications in our model schema such as the 'trim' option.)

userSchema.pre('save', function(next) {
  this.username = this.username.toLowerCase()
  this.password = bcrypt.hashSync(this.password, 8)

  if (!this.fullName) {
    this.fullName = 'Unknown'
  }

  const currentDate = new Date().getTime()
  this.updatedAt = currentDate

  if (!this.createdAt) {
    this.createdAt = currentDate
  }

  if (this._id) {
    delete this._id
  }

  next()
})

userSchema.pre('findOneAndUpdate', function (next) {
  const doc = this.getUpdate()

  if (doc.password) {
    doc.password = bcrypt.hashSync(doc.password, 8)
  }
  if (doc._id) {
    delete doc._id
  }

  this.update({}, {
    fullName: doc.fullName || 'Unknown',
    updatedAt: new Date().getTime()
  })

  next()
})

const user = mongoose.model('users', userSchema)

module.exports = user