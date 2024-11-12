const { registerUser, loginUser } = require('./handler')
const { validateToken } = require('./token')

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
  // {
  //   method: 'PUT',
  //   path: '/api/user/edit',
  //   options: {
  //     pre: [{ method: validateToken }],
  //   },
  //   handler: changeUsername,
  // },
]

module.exports = routes
