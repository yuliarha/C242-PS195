const { registerUser, loginUser } = require('./handler')

const routes = [
  {
    method: 'POST',
    path: '/register',
    handler: registerUser,
  },
  {
    method: 'POST',
    path: '/login',
    handler: loginUser,
  },
]

module.exports = routes
