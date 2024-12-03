const dbConfig = require('./db')
const bcrypt = require('bcrypt')
const { generateToken } = require('./token')
const { nanoid } = require('nanoid')
const { loginSchema } = require('./schema')
const { registerSchema } = require('./schema')

const registerUser = async (request, h) => {
  const { error } = registerSchema.validate(request.payload, {
    abortEarly: false,
  })
  if (error) {
    const response = h.response({
      status: 'failed',
      message: error.message,
    })
    response.code(422)
    return response
  }

  const { username, email, password } = request.payload
  const id = nanoid()
  const role = 'user'
  const created_at = new Date()
  const updated_at = created_at

  const salt = await bcrypt.genSalt(10)
  const hashed_password = await bcrypt.hash(password, salt)

  const createQuery =
    'INSERT INTO users (id, username, email, hashed_password, role, created_at, updated_at) VALUES(?, ?, ?, ?, ?, ?, ?)'
  try {
    const checkUserQuery = 'SELECT * FROM users WHERE username = ? OR email = ?'
    const [existingUser] = await dbConfig.query(checkUserQuery, [
      username,
      email,
    ])

    if (existingUser.length > 0) {
      const response = h.response({
        data: 'Username atau Email sudah ada',
      })
      response.code(400)
      return response
    }

    const [result] = await dbConfig.query(createQuery, [
      id,
      username,
      email,
      hashed_password,
      role,
      created_at,
      updated_at,
    ])
    const response = h.response({
      status: 'success',
      message: 'User berhasil dibuat',
    })
    response.code(200)
    return response
  } catch (error) {
    console.log(error)
    if (error.code === 'ER_DUP_ENTRY') {
      const response = h.response({
        data: 'Username atau Email Sudah Ada',
      })
      response.code(400)
      return response
    }
    const response = h.response({
      data: error,
    })
    response.code(500)
    return response
  }
}

const loginUser = async (request, h) => {
  try {
    const { error } = loginSchema.validate(request.payload, {
      abortEarly: false,
    })
    if (error) {
      const response = h.response({
        status: 'failed',
        message: error.message,
      })
      response.code(422)
      return response
    }

    const { username, password } = request.payload

    const searchQuery = 'SELECT * FROM users WHERE username = ?'
    const [row] = await dbConfig.query(searchQuery, [username])

    if (!row.length) {
      const response = h.response({
        status: 'failed',
        message: 'Username tidak ditemukan',
      })
      response.code(400)
      return response
    }

    const user = row[0]
    const { hashed_password } = user
    const isPasswordMatched = await bcrypt.compare(password, hashed_password)

    if (!isPasswordMatched) {
      const response = h.response({
        status: 'failed',
        message: 'Password salah',
      })
      response.code(400)
      return response
    }

    const token = generateToken(user)

    const response = h.response({
      status: 'success',
      loginResult: {
        username,
        token,
      },
    })
    response.code(200)
    return response
  } catch (error) {
    const response = h.response({
      status: 'failed',
      message: error,
    })
    response.code(500)
    return response
  }
}

// const changeUsername = async (request, h) => {
//   const { newUsername } = request.payload

//   const searchQuery = 'SELECT * FROM users WHERE username=?'
//   const [row] = await dbConfig.query(searchQuery, [newUsername])

//   if (row.length) {
//     const response = h.response({
//       status: 'failed',
//       message: 'Username sudah ada',
//     })
//     response.code(400)
//     return response
//   }

//   const authUser = request.auth.credentials
//   const { email } = authUser
//   const updated_at = new Date()

//   const updateQuery = 'UPDATE users SET username=?, updated_at=? WHERE email=?'
//   const [result] = await dbConfig.query(updateQuery, [
//     newUsername,
//     updated_at,
//     email,
//   ])

//   const response = h.response({
//     status: 'success',
//     result,
//   })
//   response.code(200)
//   return response
// }

module.exports = { registerUser, loginUser }
