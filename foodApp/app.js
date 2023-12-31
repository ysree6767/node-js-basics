const express = require('express')
const app = express()
const mongoose = require('mongoose')

app.listen(3000)

// Middleware func -> post, font -> json:
app.use(express.json());

let users = [
 { id: 1, name: 'John', age: 25 },
 { id: 2, name: 'Jane', age: 30 },
 // Add more users as needed
];
const userRouter = express.Router()
const authRouter = express.Router()


app.use('/user', userRouter)
app.use('/auth', authRouter)


userRouter
 .route('/')
 .get(getUser)
 .post(postUser)
 .patch(updateUser)
 .delete(deleteUser)

userRouter
 .route('/:id')
 .get(getUserById)

authRouter
 .route('/signup')
 .get(middleware1, getSignUp, middleware2)
 .post(postSignUp)






function getUser(req, res) {
 res.send(users)
}

function postUser(req, res) {
 console.log('req.body', req.body)
 users = req.body
 res.json({
  message: "data received successfully",
  user: req.body
 })
}

function updateUser(req, res) {
 console.log('req.body', req.body)
 users = req.body
 res.json({
  message: 'data updated successfully',
  users: req.body
 })
}

function deleteUser(req, res) {
 users = {}
 res.json({
  message: 'data deleted successfully'
 })
}

function getUserById(req, res) {
 console.log('req.params.id', req.params.id)
 let paramId = req.params.id;
 let obj = {}

 for (let i = 0; i < users.length; i++) {
  if (users[i]['id'] == paramId) {
   obj = users[i];
  }
 }
 res.json({
  message: 'req received',
  data: obj
 })
}

function middleware1(req, res, next) {
 console.log('middleware1 encountered')
 next()
}

function middleware2(req, res, next) {
 console.log('middleware2 encountered')
 // next()
 console.log("middleware 2 ended req/res cycle")
 res.sendFile('public/index.html', { root: __dirname })
}



function getSignUp(req, res, next) {
 console.log('get signup triggered')
 next()
 // res.sendFile('public/index.html', {root:__dirname})

}


function postSignUp(req, res) {
 let obj = req.body
 console.log('backend', obj)
 res.json({
  message: "user signed up successfully",
  data: obj
 })
}


const db_link = 'mongodb+srv://admin:7KrDBscDZkWrCMX9@cluster0.wecpjzq.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(db_link)
 .then(function (db) {
  // console.log('db', db)
  console.log('db connected')
 })
 .catch(function (err) {
  console.log(err)
 })

//schema
const userSchema = mongoose.Schema({
 name: {
  type: String,
  required: true
 },
 email: {
  type: String,
  required: true,
  unique: true
 },
 password: {
  type: String,
  required: true,
  minlength: 8
 },
 confirmPassword: {
  type: String,
  required: true,
  minlength: 8
 }
})

//model
const userModel = mongoose.model('userModel', userSchema)

// Async function to create user
async function createUser() {
 let user = {
  name: 'john doe',
  email: 'abc@gmail.com',
  password: '12345678',
  confirmPassword: '12345678'
 }

 try {
  let data = await userModel.create(user)
  console.log('User created successfully:', data)
 } catch (err) {
  console.error('Error creating user:', err)
 }
}

// Call the function
createUser();

