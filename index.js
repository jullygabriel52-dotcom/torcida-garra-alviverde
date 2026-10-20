let requestHandler;
try {
  requestHandler = require('./server');
} catch (e) {
  requestHandler = require('../server');
}

module.exports = async function handler(req, res) {
  return requestHandler(req, res);
};
