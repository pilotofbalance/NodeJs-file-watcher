const utils = require('../utils/utils');
const token = require('../utils/token');

//reset token
const handler = (req, resp) => {
   utils.collectData(req, (data) => {
   	 token.set(null);
   	 utils.sendResponse(resp, 'Successfuly logged out', 200);
   });
}

module.exports = handler;