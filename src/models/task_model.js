const { model, Schema } = require('mongoose')

const taskSchema = new Schema({
  content: { type: String, required: true },
  date: { type: Date, required: true },
  important: { type: Boolean, required: true },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
})

taskSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const task = model('tasks', taskSchema)

module.exports = task
