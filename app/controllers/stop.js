const utils = require('../utils/utils');
const token = require('../utils/token');

const handler = (req, resp) => {
   utils.collectData(req, (data) => {
   	 //destroy watcher
   	 utils.sendResponse(resp, {msg:'monitoring has been stoped'}, 200, {'Content-Type': 'application/json'});
   });
}

module.exports = handler;