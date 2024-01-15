const CustomError = require('../errors')

const checkPermissions = (reqUser, userId)=>{
    if(reqUser.role === 'admin') return
    if(reqUser.userId === userId) return
    throw new CustomError.UnauthorizedError('Not authorized to access')
}

module.exports = checkPermissions