const { test } = require("./handler");


const routes = [
    {
      method: 'POST',
      path: '/api-test',
      handler: test
    
    },

]

module.exports = routes;