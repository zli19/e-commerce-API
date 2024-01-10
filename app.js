require('dotenv').config()
require('express-async-errors')

// express
const express = require('express')
const app = express()

// rest of the packages
const morgan = require('morgan')

// db
const connectDB = require('./db/connect')

// routers
const authRouter = require('./routes/authRouter')

// middlewares
const notFound = require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler')

// configure app

app.use(morgan('tiny'))
app.use(express.json())


app.get('/', (req, res) => {
    res.send('e-commerce api')
})
app.use('/api/v1/auth', authRouter)


app.use(notFound)
app.use(errorHandler)

// start server
const port = process.env.PORT || 5000
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}...`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()