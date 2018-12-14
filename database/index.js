const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', {
  useMongoClient: true,});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Successfully connected to DB')
});
  
  
  let repoSchema = mongoose.Schema({
    name: String,
    starCount: Number
  });
  
  let Repo = mongoose.model('Repo', repoSchema);
  

let save = (repos, cb) => {
  repos.forEach(repo => {
    let newEntry = new Repo({name:repo.name, starCount:repo.starCount})
    newEntry.save((err, res) => {
      if (err) {
        cb(err)
      }
    })
  })
  cb(null, 'SUCCESS WRITING TO DB')
}

module.exports.save = save;
module.exports.Repo = Repo;