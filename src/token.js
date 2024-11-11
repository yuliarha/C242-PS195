const jwt = require('jsonwebtoken')

const generateToken = (user) => {
  const payload = {
    id: user.id,
    username: user.username,
    email: user.email,
  }

  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: '15d',
  })
  return token
}

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY)
}

// validateToken


module.exports = { generateToken, verifyToken }
