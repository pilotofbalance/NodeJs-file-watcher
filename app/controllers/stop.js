const utils = require('../utils/utils');
const token = require('../utils/token');
const watcher = require('../utils/watcher');

//destroy file observer 
const handler = (req, resp) => {
   utils.collectData(req, (data) => {
     watcher.stop();
   	 utils.sendResponse(resp, 'Service stopped successfully', 200);
   });
}

module.exports = handler;