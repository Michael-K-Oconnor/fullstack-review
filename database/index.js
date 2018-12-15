const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', {
  useMongoClient: true,});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Successfully connected to DB')
});
  
  
  let repoSchema = mongoose.Schema({
    user: String,
    name: String,
    starCount: Number,
    url: {
      type: String,
      index: true,
      unique: true
    }
  });
  
  let Repo = mongoose.model('Repo', repoSchema);
  

let save = (repos) => {
  let savePromises = repos.map(repo => {
    return Repo.findOneAndUpdate({url:repo.url}, repo, {upsert:true})
  })
  return Promise.all(savePromises)
}

module.exports.save = save;
module.exports.Repo = Repo;