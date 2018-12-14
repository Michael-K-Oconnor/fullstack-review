const request = require('request');
const config = require('../config.js');

let getReposByUsername = (user, cb) => {
  let options = {
    url: 'https://api.github.com/users/' + user + '/repos',
    headers: {
      'User-Agent': 'michael-k-oconnor',
      'Authorization': `token ${config.TOKEN}`
    }
  };
  request(options, (err, result, body) => {
    if (err) {
      cb(err)
    } else {
      cb(null, result, body)
    }
  })
}

module.exports = getReposByUsername;