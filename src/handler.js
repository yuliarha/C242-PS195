const dbConfig = require("./db")
const bcrypt = require("bcrypt")

const registerUser = async (request, h) => {
  const { id, username, email, password, role } = request.payload
  const created_at = new Date()
  const updated_at = created_at

  const salt = await bcrypt.genSalt(10)
  const hashed_password = await bcrypt.hash(password, salt)

  const createQuery =
    "INSERT INTO users (id, username, email, hashed_password, role, created_at, updated_at) VALUES(?, ?, ?, ?, ?, ?, ?)"
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
    if (error.code === "ER_DUP_ENTRY") {
      const response = h.response({
        data: "Username atau Email Sudah Ada",
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

module.exports = { registerUser }
