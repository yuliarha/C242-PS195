const {
  registerUser,
  loginUser,
  getDestinationById,
  searchDestinationByPlaceName,
} = require('./handler')

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
    path: '/api/destination/place/{id}',
    handler: getDestinationById,
  },
  {
    method: 'POST',
    path: '/api/destination/search',
    handler: searchDestinationByPlaceName,
  },
]

module.exports = routes
