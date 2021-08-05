const dotenv = require('dotenv')
const moongose = require('mongoose')
dotenv.config()

const { MONGO_DB_URI, MONGO_DB_TEST, NODE_ENV } = process.env
// const connectionString = 'mongodb+srv://jobzi_user:Qwerty123.@cluster0.zqn6h.mongodb.net/yaw_database?retryWrites=true&w=majority'
// console.log(MONGO_DB_URI)

const connectionString = NODE_ENV === 'test' ? MONGO_DB_TEST : MONGO_DB_URI
const db = moongose.connect(connectionString, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}).then(() => {
  console.log('Database Connect')
}).catch(err => {
  console.error(err)
})

process.on('uncaughtException', () => {
  console.log('close connection')
  moongose.disconnect()
})

module.exports = db
