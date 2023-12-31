const express = require('express')
const app = express()
const userModel = require('./models/userModel')
const cookieParser = require('cookie-parser')

app.listen(3000)

// Middleware func -> post, font -> json:
app.use(express.json());
app.use(cookieParser())

// let users = [
//  { id: 1, name: 'John', age: 25 },
//  { id: 2, name: 'Jane', age: 30 },
//  // Add more users as needed
// ];
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
 .route('/getCookies')
 .get(getCookies)

userRouter
 .route('/setCookies')
 .get(setCookies)


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


function getCookies(req, res) {
let cookies = req.cookies;
console.log('cookies', cookies)
res.send('cookies received')
}

function setCookies(req, res) {
 // res.setHeader('Set-Cookie', 'isLoggedIn = true');
 res.cookie('isLoggedIn', true, {maxAge: 1000*60*60})
 res.cookie('isPrimeMember', true, {maxAge: 1000*60*60, secure: true, httpOnly: true})
 res.send('cookies has been set')
}


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

