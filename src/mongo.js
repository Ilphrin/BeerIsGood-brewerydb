const mongoose = require('mongoose');
const config = require('../config/config.js');

const beerSchema = new mongoose.Schema({
  id: String,                                                 // id
  name: String,                                               // name
  alcohol: { type: Number, default: 0.0, required: false },   // abv
  image: { type: String, default: "", required: false },      // labels.large
  type: { type: String, default: "", required: false },       // style.category.name
  srm: { type: Number, default: 1, required: false },         // srmId
  ibu: { type: Number, default: 1, required: false },         // ibu
});
const BeerModel = mongoose.model('beers', beerSchema);

function startConnection() {
  mongoose.connect(config.heroku.mongo, { useNewUrlParser: true }, err => {
    if (err) {
      throw err;
    }
  });
}

function drop() {
  BeerModel.deleteMany({}, () => {
    console.log("Dropped collection content");
  });
}

module.exports = {
  startConnection,
  drop,
  BeerModel,
};
