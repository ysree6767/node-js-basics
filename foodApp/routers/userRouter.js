const express = require('express')
const userRouter = express.Router()
const protectRoute = require('./authHelper')
const { getUsers, getUserById, postUser, updateUser, deleteUser, setCookies, getCookies } = require('../controller/userController')


userRouter
 .route('/')
 .get(protectRoute, getUsers)
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




module.exports = userRouter;