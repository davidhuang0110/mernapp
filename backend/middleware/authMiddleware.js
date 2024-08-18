// this function is going to check the token

const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler( async(req, res, next) => {
    let token

    // in http headers have an authorization object
    // check if it starts with 'Bearer', it's a format
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1] // [0] is 'Bearer'

            // Veryfy token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // Get user from the token
            // .select('-password'): don't include password
            req.user = await User.findById(decoded.id).select('-password')

            // call the next piece of middleware
            next()
        }
        catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not authorized')
        }
    }

    if(!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

module.exports = {protect}