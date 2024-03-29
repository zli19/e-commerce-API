const jwt = require("jsonwebtoken")

const genJWT = (payload) => {
    const token = jwt.sign(payload, process.env.JWT_PRIVATE_KEY,
        { expiresIn: process.env.JWT_EXPIRES_IN })
    return token
}

const isTokenValid = (token) => jwt.verify(token, process.env.JWT_PRIVATE_KEY)

const attachCookiesToRes = (payload, res) => {
    const token = genJWT(payload)
    const oneDay = 1000 * 60 * 60 * 24
    res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === 'production',
        signed:true,
        // sameSite: 'Strict'
    })
}

const attachCookiesForUserToRes = (user, res)=>{
    const tokenUser = { name: user.name, userId: user._id, role: user.role }
    attachCookiesToRes(tokenUser, res)
    return tokenUser
}

module.exports = {
    attachCookiesForUserToRes,
    isTokenValid
}
