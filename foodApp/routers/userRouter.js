const express = require('express')
const userRouter = express.Router()
const userModel = require('../models/userModel')


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

function getCookies(req, res) {
 let cookies = req.cookies;
 console.log('cookies', cookies)
 res.send('cookies received')
}

function setCookies(req, res) {
 // res.setHeader('Set-Cookie', 'isLoggedIn = true');
 res.cookie('isLoggedIn', true, { maxAge: 1000 * 60 * 60 })
 res.cookie('isPrimeMember', true, { maxAge: 1000 * 60 * 60, secure: true, httpOnly: true })
 res.send('cookies has been set')
}

module.exports = userRouter;