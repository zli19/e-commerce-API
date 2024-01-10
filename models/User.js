const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name.'],
        minLength: 3,
        maxLength: 50
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Please provide email.'],
        validate: {
            validator: validator.isEmail,
            message: 'Please provide valid email.'
        }
    },
    password: {
        type: String,
        required: [true, 'Please provide password.'],
        minlength: 6
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
})

UserSchema.pre('save', async function () {
    if (!this.isModified('password')) return
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.validatePassword = async function (inputPassword) {
    const isValid = await bcrypt.compare(inputPassword, this.password)
    return isValid
}

module.exports = mongoose.model('User', UserSchema)