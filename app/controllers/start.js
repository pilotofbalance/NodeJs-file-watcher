const utils = require('../utils/utils');
const token = require('../utils/token');

const handler = (req, resp) => {
   utils.collectData(req, (data) => {
   	 //initiate watcher
   	 utils.sendResponse(resp, data, 200, {'Content-Type': 'application/json'});
   });
}

module.exports = handler;