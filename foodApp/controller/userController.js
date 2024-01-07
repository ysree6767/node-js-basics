const userModel = require('../models/userModel')


module.exports.getUsers = async function getUsers(req, res) {
 // let allUsers = await userModel.find()
 let users = await userModel.find();
 if (users) {
  return res.json(users)
 } else {
  res.json({
   message: 'users not found',
  })
 }
}

module.exports.postUser = function postUser(req, res) {
 console.log('req.body', req.body)
 users = req.body
 res.json({
  message: "data received successfully",
  user: req.body
 })
}

module.exports.updateUser = async function updateUser(req, res) {
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

module.exports.deleteUser = async function deleteUser(req, res) {
 // users = {}
 let dataTobeDeleted = req.body
 let user = await userModel.findOneAndDelete(dataTobeDeleted)
 res.json({
  message: 'data deleted successfully',
  data: user
 })
}

module.exports.getUserById = function getUserById(req, res) {
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

module.exports.getCookies =  function getCookies(req, res) {
 let cookies = req.cookies;
 console.log('cookies', cookies)
 res.send('cookies received')
}

module.exports.setCookies =  function setCookies(req, res) {
 // res.setHeader('Set-Cookie', 'isLoggedIn = true');
 res.cookie('isLoggedIn', true, { maxAge: 1000 * 60 * 60 })
 res.cookie('isPrimeMember', true, { maxAge: 1000 * 60 * 60, secure: true, httpOnly: true })
 res.send('cookies has been set')
}