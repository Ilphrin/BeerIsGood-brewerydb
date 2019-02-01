const config = require('../config/config');

function computeUrl(endpoint, page) {
  return `${config.sandboxUrl}/${endpoint}/?key=${config.sandboxKey}&p=${page}&format=json`;
}

module.exports = {
  computeUrl,
};
