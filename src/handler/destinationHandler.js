const dbConfig = require('../db/db')
const axios = require('axios')

const getDestinationById = async (request, h) => {
  const { id } = request.params
  const searchQuery = 'SELECT * FROM destinations WHERE id = ?'
  const [row] = await dbConfig.query(searchQuery, [id])

  if (row.length != 1) {
    const response = h.response({
      status: 'failed',
      message: 'No place was found with that ID',
    })
    response.code(400)
    return response
  }

  const response = h.response({
    status: 'success',
    data: row[0],
  })
  response.code(200)
  return response
}

const searchDestinationByPlaceName = async (request, h) => {
  const { place_name } = request.payload

  const searchQuery = 'SELECT * FROM destinations WHERE place_name = ?'
  const [row] = await dbConfig.query(searchQuery, [place_name])

  if (row.length != 1) {
    const response = h.response({
      status: 'failed',
      message: 'Place is not found',
    })
    response.code(400)
    return response
  }

  const response = h.response({
    status: 'success',
    data: row[0],
  })
  return response
}

const recommendPlaceByLastseen = async (request, h) => {
  const authUser = request.auth.credentials
  const { email } = authUser

  const query = 'SELECT * FROM users WHERE email = ?'
  const [row] = await dbConfig.query(query, [email])

  const id = 9

  const targetUrl = `http://localhost:8080/api/destination/recommendation-cb/history/${id}`

  const dataResponse = await axios.get(targetUrl)

  const { data } = dataResponse

  const response = h.response({
    status: 'success',
    data,
  })
  response.code(200)
  return response
}
const getDestinationByCatergoryName = async (request, h) => {
  const { categoryname } = request.params
  const categoryquery = 'SELECT * FROM destinations WHERE category_name=?'
  const [row] = await dbConfig.query(categoryquery, [categoryname])

  if (row.length != 1) {
    const response = h.response({
      status: 'failed',
      message: 'No place was found with that name',
    })
    response.code(400)
    return response
  }

  const response = h.response({
    status: 'success',
    data: row[0],
  })
  response.code(200)
  return response
}

const getDestinationByCityTag = async (request, h) => {
  const { citytag } = request.params
  const getcityquery = 'SELECT * FROM destinations WHERE city_tag=?'
  const [row] = await dbConfig.query(getcityquery, [citytag])

  if (row.length != 1) {
    const response = h.response({
      status: 'failed',
      message: 'theres no city with such name',
    })
    response.code(400)
    return response
  }

  const response = h.response({
    status: 'success',
    data: row[0],
  })
  response.code(200)
  return response
}

module.exports = {
  getDestinationById,
  searchDestinationByPlaceName,
  recommendPlaceByLastseen,
  getDestinationByCatergoryName,
  getDestinationByCityTag,
}
