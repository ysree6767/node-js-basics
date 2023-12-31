const express = require('express')
const app = express()
const mongoose = require('mongoose')
const emailValidator = require("email-validator");

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






async function getUser(req, res) {
 // let allUsers = await userModel.find()
 let user = await userModel.findOne({ name: 'john doe' })
 res.json({
  message: 'list of all users',
  data: user
 })

}

function postUser(req, res) {
 console.log('req.body', req.body)
 users = req.body
 res.json({
  message: "data received successfully",
  user: req.body
 })
}

async function updateUser(req, res) {
 console.log('req.body', req.body)
 // users = req.body
 // res.json({
 //  message: 'data updated successfully',
 //  users: req.body
 // })
 let dataToBeUpdated = req.body;
 let user = await userModel.findOneAndUpdate({ email: "abcde@gmail.com" }, dataToBeUpdated)
 res.json({
  message: 'data updated successfully'
 })
}

async function deleteUser(req, res) {
 // users = {}
 let dataTobeDeleted = req.body
 let user = await userModel.findOneAndDelete(dataTobeDeleted)
 res.json({
  message: 'data deleted successfully',
  data: user
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


async function postSignUp(req, res) {

 let dataObj = req.body;
 let user = await userModel.create(dataObj);

 res.json({
  message: "user signed up successfully",
  data: user
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
  unique: true,
  validate: function(){
   return emailValidator.validate(this.email)
  }
 },
 password: {
  type: String,
  required: true,
  minlength: 8
 },
 confirmPassword: {
  type: String,
  required: true,
  minlength: 8,
  validate: function() {
   return this.confirmPassword == this.password
  }
 }
})

//pre post hooks of mongodb

//after save event occurs in db
// userSchema.pre('save', function(){
//  console.log('before sving in db', this)
// })

// //after save event occurs in db
// userSchema.post('save', function (doc) {
//  console.log('after sving in db', doc)
// })

userSchema.pre('save', function(){
 this.confirmPassword=undefined;
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
// createUser();

