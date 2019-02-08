const axios = require('axios');

const config    = require('./config/config');
const brewerydb = require('./utils/brewerydb');
const app       = require('./src/express');
const mongo     = require('./src/mongo');
mongo.startConnection();

function prepareDatabase(res) {
  mongo.drop();
  requestNextBeerPage(1).then(() => {
    if (res) {
      res.send({
        status: "Request succeeded! checkout the database",
      });
    }
  }).catch(err => {
    if (res) {
      res.send(err);
    }
  });
}

app.get('/', res => {
  res.send({
    "HELLO": "WORLD",
  });
});

function insertABeer(elem) {
  const id = `${elem.id}`;
  let image, type = "";
  if (elem.labels) {
    image = elem.labels.large;
  }
  if (elem.style && elem.style.category) {
    type = elem.style.category;
  }
  const beer = new mongo.BeerModel({
    id,
    name: elem.name,
    alcohol: elem.abv,
    image: "",
    type: "",
    srm: elem.srmId,
    ibu: elem.ibu,
  });
  beer.save(err => {
    if (err) {
      console.error(err);
    }
  });
}

function requestNextBeerPage(page) {
  return new Promise((resolve, reject) => {
    console.log("Requesting page ", page);
    axios.get(brewerydb.computeUrl('/beers', page))
      .then((response) => {
        for (const elem of response.data.data) {
          insertABeer(elem);
        }
        if (response.data.currentPage < response.data.numberOfPages) {
          requestNextBeerPage(page + 1).then(() => {
            resolve(true);
          });
        }
        else {
          resolve(true);
        }
      }).catch(err => {
        console.error("ERROR:", err);
        reject(err);
      });
  });
}

app.get('/beers', res => {
  prepareDatabase(res);
});

app.listen();
prepareDatabase();
