const express = require('express');
const bodyParser = require('body-parser');
const getReposByUsername = require('../helpers/github.js');
const dbConnection = require('../database/index.js')

let app = express();

app.use(bodyParser.json({"strict":false}));
app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  let user = req.body.username;
  getReposByUsername(user)
  .then(result => {
    let repos = []
    result.data.forEach(repo => {
      repos.push({user:user, name:repo.name, 
        starCount: repo.stargazers_count, url: user+ '/' + repo.name})
    })
    dbConnection.save(repos)
      .then(()=> {
        console.log('success writing to db')
        getRepos(req,res)      
      })
      .catch((err => {
        console.log('Error writing to db: ', err) 
        res.sendStatus(500)
        res.end()        
      }))
    })
  .catch(err => {
    console.log('Error in Gitbub API call', err)
    res.sendStatus(500)
    res.end()
  })
})


app.get('/repos', function (req, res) {
  getRepos(req,res)
});

const getRepos = (req, res) => {
  dbConnection.Repo.find()
  .sort({starCount: -1})
  .limit(5)
  .exec()
  .then(query => {
    let result = [];
    query.forEach(repo => {
      result.push({name:repo.name,starCount:repo.starCount, url:repo.url})
    })
    res.status(200)
    res.json(result)
  })
  .catch((err => {
    console.log('Error getting data from DB: ', err)
  }))
}

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

