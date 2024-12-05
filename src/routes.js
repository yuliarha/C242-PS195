const {
  registerUser,
  loginUser,
  getDestinationById,
  searchDestinationByPlaceName,
  recommendPlaceByLastseen,
  getDestinationByCatergoryName,
  getDestinationByCityTag,
} = require('./handler')
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
  {
    method: 'GET',
    path: '/api/destination/recommend/history',
    handler: recommendPlaceByLastseen,
    options: {
      pre: [{ method: validateToken }],
    },
  },
  {
    method: 'GET',
    path: '/api/destination/category/{categoryname}',
    handler: getDestinationByCatergoryName,
  },
  {
    method: 'GET',
    path: '/api/destination/city/{citytag}',
    handler: getDestinationByCityTag,
  },
]

module.exports = routes
