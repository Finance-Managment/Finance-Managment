/** @format */

require('dotenv').config()
const express = require('express')
const cors = require('cors')
const errorHandler = require('./backend/middleware/errorHandler.js')
const connectToDB = require('./backend/config/db.js')

connectToDB()

const app = express()
app.use(express.json())
app.use(cors())
app.options('*', cors())
app.use(express.urlencoded({ extended: false }))

// routes

// users
app.use('/api/users', require('./backend/routes/userRoutes.js'))

// incomes

app.use('/api/incomes', require('./backend/routes/incomeRoutes.js'))

// outcomes

app.use('/api/outcomes', require('./backend/routes/outcomeRoutes.js'))

// savings

app.use('/api/savings', require('./backend/routes/savingRoutes.js'))

app.use(errorHandler)

app.listen(process.env.PORT, () =>
    console.log(`server is running on port ${process.env.PORT}`)
)
