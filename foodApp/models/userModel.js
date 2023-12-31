const mongoose = require('mongoose')
const emailValidator = require("email-validator");
const bcrypt = require('bcrypt');


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
  validate: function () {
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
  validate: function () {
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

userSchema.pre('save', function () {
 this.confirmPassword = undefined;
})

// userSchema.pre('save', async function () {
//  let salt = await bcrypt.genSalt();
//  let hashedString = await bcrypt.hash(this.password, salt)
//  this.password = hashedString
// })



//model
const userModel = mongoose.model('userModel', userSchema)


module.exports = userModel;