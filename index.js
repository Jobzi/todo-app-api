
require('./src/database/connection.js')
const dotenv = require('dotenv')
const express = require('express')
const cors = require('cors')
const logger = require('./src/middlewares/loggerMidlleware.js')
const handleErrors = require('./src/middlewares/handleErrors.js')
const notFound = require('./src/middlewares/notFound.js')
const userRoutes = require('./src/routes/user.routes.js')
const taskRoutes = require('./src/routes/task.routes.js')

dotenv.config()
const app = express()
// middlewares init
app.use(cors())
app.use(express.json())
app.use(logger)

// router init
app.get('/', (req, res) => {
  console.log(req.ip)
  console.log(req.ips)
  console.log(req.originalUrl)
  res.send('<h1>WELCOME TO API</h1>')
})

// router of models
app.use('/api/user', userRoutes)
app.use('/api/task', taskRoutes)

// middlewares last
app.use((error, req, res, next) => {
  console.log(error)
  console.log(error.name)
  res.status(404).end()
})

app.use(notFound)
app.use(handleErrors)

const PORT = process.env.PORT
const server = app.listen(PORT, () => {
  console.log('Server runnig on port ' + PORT)
})

module.exports = server
