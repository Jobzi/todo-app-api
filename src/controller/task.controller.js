const TaskModel = require('../models/task_model.js')
const UserModel = require('../models/user_model.js')

const getAllTask = async (req, res) => {
  const { userId } = req
  const task = await TaskModel.find({}).sort({ date: 'ascending' }).populate('user', {
    name: 1,
    email: 1
  })
  const filterTask = task.filter(task => task.user.id === userId)
  res.json(filterTask)
}

const postTask = async (req, res) => {
  const { body } = req
  const { content, important } = body
  try {
    const { userId } = req
    const getUser = await UserModel.findById(userId)
    if (!content) {
      return res.status(400).json({ error: ' requiere "Contenido" no fue encontrado' })
    }

    const task = new TaskModel({
      content,
      date: new Date(),
      important,
      user: getUser._id
    })

    const savedtask = await task.save()

    getUser.tasks = getUser.tasks.concat(savedtask._id)
    await getUser.save()

    res.json(savedtask)
  } catch (error) {
    console.log(error)
    return res.status(400).json({ error: 'HUBO ALGUN ERROR' })
  }
}

const putTask = async (req, res) => {
  const { id } = req.params
  const { body } = req
  try {
    console.log(id)
    console.log(body)
    await TaskModel.findByIdAndUpdate(id, body, { new: true }).then(result => {
      res.json(result)
    })
  } catch (error) {
    return res.status(400).json({ error: 'HUBO ALGUN ERROR' })
  }
}

module.exports = { getAllTask, postTask, putTask }
