const utils = require('../utils/utils');
const token = require('../utils/token');

const handler = (req, resp, params) => {
  utils.sendResponse(resp, params, 200, {'Content-Type': 'application/json'});
}

module.exports = handler;