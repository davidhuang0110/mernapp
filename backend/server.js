// entry point to our server

const path = require('path')
const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
// process.env.PORT is at .env file
const port = process.env.PORT || 6000

connectDB()

const app = express()

// in order to use "console.log(req.body)" in setGoal
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// if hits '/api/goals', it's going to look at 'goalRoutes.js' file router.get...
app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

// Serve frontend
if(process.env.MODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req, res) => req.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')))
}
else {
    app.get('/', (req, res) => res.send('Please set .env NODE_ENV = development to production'))
}

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))