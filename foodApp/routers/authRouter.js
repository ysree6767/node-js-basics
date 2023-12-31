const express = require('express')
const userModel = require('../models/userModel')
const authRouter = express.Router()


authRouter
 .route('/signup')
 .get(middleware1, getSignUp, middleware2)
 .post(postSignUp)

authRouter
 .route('/login')
 .post(loginUser)


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

async function loginUser(req, res) {
 try {
  let { email, password } = req.body
  if (email) {
   let user = await userModel.findOne({ email: email })
   if (user) {
    if (user.password == password) {
     return res.json({
      message: 'logged in successfully',
      userDetails: { email, password }
     })
    } else {
     return res.json({
      message: 'wrong credentials'
     })
    }
   }
   else {
    return res.json({
     message: 'user not found'
    })
   }
  }
 }
 catch (err) {
  return res.json({
   message: err.message
  })
 }

}


module.exports = authRouter