const { model, Schema } = require('mongoose')

const userSchema = new Schema({
  user: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: 'tasks'
    }
  ]
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash // * No deberia devolver la contraseña no es necesario
  }
})

const user = model('users', userSchema)

module.exports = user
