const User = require('../models/User')
const { BadRequestError } = require('../errors')
const { StatusCodes } = require('http-status-codes')

const register = async (req, res) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        throw new BadRequestError('Please provide name, email and password')
    }
    const isEmailDup = await User.findOne({ email: email })
    console.log(isEmailDup)
    if (isEmailDup) {
        throw new BadRequestError('Email is already in use.')
    }
    const user = await User.create(req.body)
    res.status(StatusCodes.CREATED).json({ user })
}

const login = async (req, res) => {
    res.send('Login user')
}

const logout = async (req, res) => {
    res.send('Logout user')
}

module.exports = {
    register,
    login,
    logout
}