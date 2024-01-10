const User = require('../models/User')
const CustomError = require('../errors')
const { StatusCodes } = require('http-status-codes')
const utils = require('../utils')

const register = async (req, res) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        throw new CustomError.BadRequestError('Please provide name, email and password')
    }
    const isEmailDup = await User.findOne({ email })
    // console.log(isEmailDup)
    if (isEmailDup) {
        throw new CustomError.BadRequestError('Email already exist.')
    }
    // first registered user is an admin
    const isFirstAccount = await User.countDocuments({}) === 0
    const role = isFirstAccount ? 'admin' : 'user'

    const user = await User.create({ name, email, password, role })
    const tokenUser = { name: user.name, userId: user._id, role: user.role }

    utils.attachCookiesToRes(tokenUser, res)
    
    res.status(StatusCodes.CREATED).json({ user: tokenUser })
}

const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        throw new CustomError.BadRequestError('Please provide email and password')
    }
    const user = await User.findOne({email})
    
    if(!user){
        throw new CustomError.UnauthenticatedError("Invalid credentials")
    }
    const isPasswordCorrect = await user.validatePassword(password)
    if(!isPasswordCorrect){
        throw new CustomError.UnauthenticatedError("Invalid credentials")
    }
    
    const tokenUser = { name: user.name, userId: user._id, role: user.role }
    utils.attachCookiesToRes(tokenUser, res)

    res.status(StatusCodes.OK).json({ user: tokenUser })
}

const logout = async (req, res) => {
    res.cookie('token', '', {
        httpOnly: true,
        expires: new Date(Date.now()),
    })
    res.status(StatusCodes.OK).json({msg: 'user logged out'})
}

module.exports = {
    register,
    login,
    logout
}