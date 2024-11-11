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
const validateToken = (request, h) => {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    const response = h.response({
      message: 'Token tidak ditemukan',
    })
    response.code(401).takeover()
    return response
  }
  const token = authHeader.split(' ')[1]
  try {
    const decoded = verifyToken(token)
    request.auth = { credentials: decoded }
    return h.continue
  } catch (error) {
    if (error.message) {
      const response = h.response({
        message: error.message,
      })
      response.code(403).takeover()
      return response
    }
    const response = h.response({
      message: error.message,
    })
    response.code(500).takeover()
    return response
  }
}

module.exports = { generateToken, verifyToken, validateToken }
