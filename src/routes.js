const { registerUser } = require("./handler");


const routes = [
    {
      method: 'POST',
      path: '/api/user/register',
      handler: registerUser
    
    },

]

module.exports = routes