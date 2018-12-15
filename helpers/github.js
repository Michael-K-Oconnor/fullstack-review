const request = require('request');
const config = require('../config.js');
const axios = require('axios');

let getReposByUsername = (user) => {
  return axios({
    method: 'GET',
    url: 'https://api.github.com/users/' + user + '/repos',
    headers: {
      'User-Agent': 'michael-k-oconnor',
      'Authorization': `token ${config.TOKEN}`
    }
  })
}

module.exports = getReposByUsername;