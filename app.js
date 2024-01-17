require('dotenv').config()
require('express-async-errors')

// express
const express = require('express')
const app = express()

// rest of the packages
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const fileUpload = require('express-fileupload')

// db
const connectDB = require('./db/connect')

// routers
const authRouter = require('./routes/authRouter')
const userRouter = require('./routes/userRouter')
const productRouter = require('./routes/productRouter')
const reviewRouter = require('./routes/reviewRouter')

// middlewares
const notFound = require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler')

// configure app

app.use(morgan('tiny'))
app.use(express.json())
app.use(cookieParser(process.env.JWT_PRIVATE_KEY))
app.use(cors())

app.use(express.static('./public'))
app.use(fileUpload())

app.get('/', (req, res) => {
    res.send('e-commerce api')
})
app.get('/api/v1', (req, res) => {
    // console.log(req.cookies)
    console.log(req.signedCookies)
    res.send('e-commerce api')
})
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/products', productRouter)
app.use('/api/v1/reviews', reviewRouter)

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