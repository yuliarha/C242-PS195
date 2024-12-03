const { registerUser, loginUser, getDestinationById } = require('./handler')

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
  {
    method: 'GET',
    path: '/api/destination/{id}',
    handler: getDestinationById,
  },
]

module.exports = routes
