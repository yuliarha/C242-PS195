const dbConfig = require('./db')
const bcrypt = require('bcrypt')
const { generateToken } = require('./token')

const registerUser = async (request, h) => {
  const { id, username, email, password, role } = request.payload
  const created_at = new Date()
  const updated_at = created_at

  const salt = await bcrypt.genSalt(10)
  const hashed_password = await bcrypt.hash(password, salt)

  const createQuery =
    'INSERT INTO users (id, username, email, hashed_password, role, created_at, updated_at) VALUES(?, ?, ?, ?, ?, ?, ?)'
  try {
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
      data: result,
    })
    response.code(200)
    return response
  } catch (error) {
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
    const isPasswordMatched = bcrypt.compare(password, hashed_password)

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
      token,
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

module.exports = { registerUser, loginUser, changeUsername }
