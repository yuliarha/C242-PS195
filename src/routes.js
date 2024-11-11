const { registerUser, loginUser } = require('./handler')

const routes = [
  {
    method: 'POST',
    path: '/api/user/register',
    handler: registerUser,
  },

  {
    method: 'POST',
    path: '/api/user/login',
    handler: loginUser,
  },
]

module.exports = routes
