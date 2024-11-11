const dbConfig = require('./db')

const test = async(request, h) => {
const { 
   id,
  username,
  email,
  hashed_password,
  role } = request.payload
  const created_at = new Date()
  const updated_at = new Date()

  const createQuery =
  'INSERT INTO users (id, username, email, hashed_password, role, created_at, updated_at) VALUES(?, ?, ?, ?, ?, ?, ?)'
  const [result] = await dbConfig.query(createQuery, [
    id,
    username,
    email,
    hashed_password,
    role,
    created_at,
    updated_at,
  ])
  return h.response ({
    status : 'success',
    result

  })
}


module.exports = {test};