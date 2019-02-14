const utils = require('../utils/utils');
const token = require('../utils/token');
const watcher = require('../utils/watcher');

/*get last monitored events
  params - path params 
*/
const handler = (req, resp, params) => {
  const logs = watcher.events();
  utils.sendResponse(resp, null, 200, logs);
}

module.exports = handler;