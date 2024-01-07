const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')

app.listen(3000)

// Middleware func -> post, font -> json:
app.use(express.json());
app.use(cookieParser());


const userRouter = require('./routers/userRouter');
const authRouter = require('./routers/authRouter')


app.use('/user', userRouter)
app.use('/auth', authRouter)

