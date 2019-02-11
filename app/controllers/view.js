const utils = require('../utils/utils');
const token = require('../utils/token');
const path = require('path');

const handler = (req, resp) => {
   const file = path.join(__dirname,'../','ui/index.html');
   utils.loadFile(resp, file, 200, {'Content-Type': 'text/html'})
}

module.exports = handler;