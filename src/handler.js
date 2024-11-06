const { default: axios } = require('axios')
const admin = require('./firebase')

const registerUser = async (request, h) => {
  const { email, password } = request.payload

  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
    })
    const response = h.response({
      uid: userRecord.uid,
      email: userRecord.email,
    })
    response.code(201)
    return response
  } catch (error) {
    if (error.errorInfo.code === 'auth/email-already-exists') {
      const response = h.response({
        error: error.message,
      })
      response.code(400)
      return response
    }

    const response = h.response({
      error: error.message,
    })
    response.code(500)
    return response
  }
}

const loginUser = async (request, h) => {
  const { email, password } = request.payload

  try {
    const result = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`,
      {
        email,
        password,
        returnSecureToken: true,
      }
    )
    const token = result.data.idToken
    const response = h.response({
      token,
    })
    response.code(200)
    return response
  } catch (error) {
    if (error.response.status === 400) {
      const response = h.response({
        error: error.message,
      })
      response.code(400)
      return response
    }

    const response = h.response({
      error: error.message,
    })
    response.code(500)
    return response
  }
}

module.exports = { registerUser, loginUser }
