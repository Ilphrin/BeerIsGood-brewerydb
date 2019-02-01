const express = require('express')();

const config = require('../config/config.js');

function listen() {
  express.listen(config.port, () => {
    console.log(`Listening on port ${config.port}`);
  });
}

function get(endpoint, callback) {
  express.get(endpoint, (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    callback(res);
  });
}

const app = {
  listen,
  get,
};

module.exports = app;
