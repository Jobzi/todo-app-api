const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const UserModel = require('../models/user_model.js')

const getAllUser = async (req, res) => {
  /* TaskModel.find().sort({ date: 'ascending' }).then(task => {
      res.json(task)
    }) */
  const user = await UserModel.find({}).populate('tasks', {
    content: 1,
    date: 1,
    _id: 0
  })
  res.json(user)
}

const postUser = async (req, res) => {
  const { body } = req
  const { user, email, passwordHash } = body
  try {
    const saltRounds = 10
    const newPassword = await bcrypt.hash(passwordHash, saltRounds)
    const newUser = new UserModel({
      user,
      email,
      passwordHash: newPassword
    })
    const savedUser = await newUser.save()
    res.json(savedUser)
  } catch (error) {
    return res.status(400).json({ error: 'HUBO ALGUN ERROR' })
  }
}

const loginUser = async (req, res) => {
  const { body } = req
  const { email, password } = body

  try {
    const user = await UserModel.findOne({ email: email })
    console.log(user)
    if (!user) {
      res.status(401).json({
        error: 'invalid email or password'
      })
    }
    const passwordCorrect = (user === null) ? false : await bcrypt.compare(password, user.passwordHash)

    if (!(user && passwordCorrect)) {
      res.status(401).json({
        error: 'invalid user or password'
      })
    }

    const userForToken = {
      id: user.id,
      email: user.email
    }

    const token = jwt.sign(userForToken, process.env.SECRET_JWT)

    res.json({
      user: user.user,
      email: user.email,
      userId: user.id,
      token: token
    })
  } catch (error) {
    return res.status(400).json({ error: 'HUBO ALGUN ERROR' })
  }
}

module.exports = { postUser, loginUser, getAllUser }
