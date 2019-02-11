const routes = require('../routes');
const url = require('url');
const token = require('./token');
const fs = require('fs');

const sendResponse = (resp, data, statusCode, headers, type) => {
  resp.writeHead(statusCode, headers);
  resp.end(JSON.stringify(data));
};
exports.sendResponse = sendResponse;

exports.loadFile = (resp, path, statusCode, headers) => {
  const fileStream = fs.createReadStream(path,'UTF-8');
  resp.writeHead(statusCode, headers);
  fileStream.pipe(resp);
}

exports.collectData = (req, callback) => {
  let data = '';
  req.on('data', (chunk) => {
    data += chunk;
  });
  req.on('end', () => {
    callback(JSON.parse(data));
  });
};

exports.routing = (req, resp) => {
	const {pathname} = url.parse(req.url);
    let urlParts = pathname.split("/");
    let param = [];
    let currentRoute = null;
    
    for(let index = 0,total = routes.length;index<total;index++){
    	let match = true;
        const patternSplit = routes[index].pattern.split("/");
        if (urlParts.length === patternSplit.length) {
            for (let i = 0, l = urlParts.length;i<l;i++) {
                const reg = patternSplit[i].match(/{(.*)}/);
                if (reg){
                    param.push(urlParts[i]);
                }else {
                    if (patternSplit[i] !== urlParts[i]) {
                        match = false;
                        break;
                    }
                }
            }
        }else {
            match = false;
        }
        if (match === true){
            currentRoute = routes[index];
            break;
        }
    }
    if(currentRoute === null || (currentRoute && currentRoute.method !== req.method)){
       sendResponse(resp, "No such service found", 404);
    }else if(currentRoute && currentRoute.auth && !token.verify(req.headers.authorization)){
  	   sendResponse(resp, "The access token provided is expired", 401);
    }
    
    return {match:currentRoute,param:param};
};