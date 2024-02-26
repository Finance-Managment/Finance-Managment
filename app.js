/** @format */

require('dotenv').config()
const express = require('express')
const http = require('http')
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

const port = process.env.PORT || 8080
app.set('port', port)

app.use(express.static(__dirname + '/frontend'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/frontend/index.html')
})
app.get('/about', (req, res) => {
    res.sendFile(__dirname + '/frontend/html/about.html')
})
app.get('/contact', (req, res) => {
    res.sendFile(__dirname + '/frontend/html/contact.html')
})
app.get('/dashboard', (req, res) => {
    res.sendFile(__dirname + '/frontend/html/dashboard.html')
})

const server = http.createServer(app)

server.listen(port, () => {
    console.log(`server is running on port ${port}`)
})
