const utils = require('../utils/utils');
const token = require('../utils/token');
const path = require('path');

//loading default html file, our client side
const handler = (req, resp) => {
   const file = path.join(__dirname,'../../','client/dist/index.html');
   utils.loadFile(resp, file, 200, {'Content-Type': 'text/html'})
}

module.exports = handler;