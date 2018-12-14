const express = require('express');
const bodyParser = require('body-parser');
const getReposByUsername = require('../helpers/github.js');
const dbConnection = require('../database/index.js')

let app = express();

app.use(bodyParser.json({"strict":false}));
app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  let user = req.body.username;
  
  getReposByUsername(user, (err, result, body) => {
    if (err) {
      console.log('Error in Gitbub API call')
      res.sendStatus(500)
      res.end()
    } else {
      body = JSON.parse(body)
      let repos = []
      body.forEach(repo => {
        repos.push({name:repo.name, starCount: repo.stargazers_count})
      })
      dbConnection.save(repos, (err, result) => {
        if (err) {
          console.log('Error writing to db: ', err) 
          res.sendStatus(500)
          res.end()
        } else {
          console.log('success writing to db')
          res.sendStatus(200)
          res.end()
        }
      })
    }
  })
})


app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  dbConnection.Repo.find({}, (err, query) => {
    if (err) {
      console.log('Error getting data from DB: ', err)
    } else {
      let result = [];
      query.forEach(repo => {
        result.push({name:repo.name,starCount:repo.starCount})
      })
      console.log('DB data: ', result)
      res.sendStatus(200)
      res.end()
    }
  })
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

