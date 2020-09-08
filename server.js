const morgan = require('morgan')
const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const bodyParser = require('body-parser')

dotenv.config()
//load db 
const connectDB = require('./config/db')
connectDB()

const app = express()
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
if (process.env.NODE_ENV === 'development'){
    
    app.use(morgan('dev'))
}
// import routes
const User = require('./routes/User')

app.use('/auth/v1/',User)

const PORT = process.env.PORT

app.listen(PORT, console.log(`Ap running on ${process.env.NODE_ENV} mode, on port:${PORT}`.yellow.underline))