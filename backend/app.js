/** @format */

require('dotenv').config()
const express = require('express')
const cors = require('cors')
const errorHandler = require('./middleware/errorHandler.js')
const connectToDB = require('./config/db.js')

connectToDB()

const app = express()
app.use(express.json())
app.use(cors())
app.options('*', cors())
app.use(express.urlencoded({ extended: false }))

// routes

// users
app.use('/api/users', require('./routes/userRoutes.js'))

// incomes

app.use('/api/incomes', require('./routes/incomeRoutes.js'))

// outcomes

app.use('/api/outcomes', require('./routes/outcomeRoutes.js'))

// savings

app.use('/api/savings', require('./routes/savingRoutes.js'))

app.use(errorHandler)

app.listen(process.env.PORT, () =>
    console.log(`server is running on port ${process.env.PORT}`)
)

