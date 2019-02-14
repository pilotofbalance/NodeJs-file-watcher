const utils = require('./utils');
const path = require('path');

const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.svg': 'application/image/svg+xml'
};

//static file loader
const loadStatic = (req, res, type) =>{
	const file = path.join(__dirname, '../../client/dist', req.url);
    utils.loadFile(res, file, 200, type);
}

//validate if request contain static file, is so load file
exports.revise= (req, res) =>{
	const extname = String(path.extname(req.url)).toLowerCase();
	const memeType = mimeTypes[extname];
	if(memeType){
		loadStatic(req, res, {"Content-Type": memeType});
		return true;
	}
    return false;
}
