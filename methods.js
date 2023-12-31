const express = require('express')
const app = express()

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

function postUser ( req, res){
 console.log('req.body', req.body)
 users = req.body
 res.json({
  message: "data received successfully",
  user: req.body
 })
}

function updateUser (req, res){
 console.log('req.body', req.body)
 users = req.body
 res.json({
  message: 'data updated successfully',
  users: req.body
 })
}

function deleteUser ( req, res ) {
 users = {}
 res.json({
  message: 'data deleted successfully'
 })
}

function getUserById (req, res){
 console.log('req.params.id', req.params.id)
 let paramId = req.params.id;
 let obj = {}

 for (let i = 0; i<users.length; i++){
  if(users[i]['id']==paramId){
   obj= users[i];
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



function getSignUp (req, res, next){
 console.log('get signup triggered')
 next()
 // res.sendFile('public/index.html', {root:__dirname})
 
}


function postSignUp(req, res) {
 let obj = req.body
 console.log('backend', obj)
 res.json({
  message:"user signed up successfully",
  data: obj
 })
}














// app.get('/user',  )

// app.post('/user', (req, res) => {
// console.log('req.body', req.body)
// users = req.body
// res.json({
//  message: "data received successfully",
//  user: req.body
// })
// })
// app.patch('/user', (req, res) => {
//  console.log('req.body', req.body)
//  users = req.body
//  res.json({
//   message: 'data updated successfully',
//   users : req.body
//  })
// } )

// app.delete('/user', (req, res) =>{
//  users={}
//  res.json({
//   message: 'data deleted successfully'
//  })

// } )

//params
// app.get('/user/:username', (req,res) => {
//  console.log('req.params.username', req.params.username)
//  console.log('req.params', req.params)
//  res.send('user id received')
// } )