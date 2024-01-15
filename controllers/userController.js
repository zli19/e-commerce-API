const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const {attachCookiesForUserToRes} = require('../utils/jwt')
const checkPermissions = require('../utils/checkPermissions')

const getAllUsers = async (req, res) => {

    const users = await User.find({ role: 'user' }).select('-password')
    res.status(StatusCodes.OK).json({ users })
}

const getSingleUser = async (req, res) => {
    checkPermissions(req.user, req.params.id)
    const user = await User.findOne({ _id: req.params.id }).select('-password')
    if (!user) {
        throw new CustomError.NotFoundError('No such user')
    }
    res.status(StatusCodes.OK).json({ user })
}

const showCurrentUser = async (req, res) => {
    res.status(StatusCodes.OK).json({ user: req.user })
}

const updateUser = async (req, res) => {
    const { name, email } = req.body
    if (!name || !email) {
        throw new CustomError.BadRequestError('Please provide name and email')
    }
    const user = await User.findByIdAndUpdate(
        req.user.userId,
        { name, email },
        { new: true, runValidators: true }
    )

    const tokenUser = attachCookiesForUserToRes(user, res)

    res.status(StatusCodes.OK).json({ user: tokenUser })
}

const updateUserPassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body
    if (!oldPassword || !newPassword) {
        throw new CustomError.BadRequestError('Please provide both current and new password')
    }
    const user = await User.findById(req.user.userId)
    const isPasswordCorrect = await user.validatePassword(oldPassword)
    if (!isPasswordCorrect) {
        throw new CustomError.UnauthenticatedError('Invalid password')
    }

    user.password = newPassword
    await user.save()
    res.status(StatusCodes.OK).json({ msg: 'Success! Password updated.' })
}

module.exports = {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword
}