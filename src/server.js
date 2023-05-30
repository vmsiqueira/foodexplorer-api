require('express-async-errors')
require('dotenv/config')

const AppError = require('./utils/AppError')
const sqliteConnection = require('./database/sqlite/index.js')
const uploadConfig = require('./configs/upload')
const express = require('express')
const cors = require('cors')
const routes = require('./routes')

sqliteConnection()

const app = express()
app.use(cors())
app.use(express.json())
app.use(routes)
app.use('/files', express.static(uploadConfig.UPLOADS_FOLDER))

app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    })
  }

  console.error(error)

  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  })
})

const port = process.env.PORT || 3333
app.listen(port, () => {
  console.log(`🔥 Server is running on port ${port}`)
})
