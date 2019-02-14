const routes = require('../routes');
const url = require('url');
const token = require('./token');
const fs = require('fs');
const Response = require('../models/response');
 
//json response handler
exports.sendResponse = (resp, msg, statusCode, data) => {
  resp.writeHead(statusCode, {'Content-Type': 'application/json'});
  resp.end(JSON.stringify(new Response(statusCode,msg,data)));
};

//load file from system
exports.loadFile = (resp, path, statusCode, headers) => {
  const fileStream = fs.createReadStream(path,'UTF-8');
  resp.writeHead(statusCode, headers);
  fileStream.pipe(resp);
}

//in case of request has data in body
exports.collectData = (req, callback) => {
  let data = '';
  req.on('data', (chunk) => {
    data += chunk;
  });
  req.on('end', () => {
    callback(JSON.parse(data));
  });
};

//request URL parser, helps route to specific controlle, TODO: rewrite..
exports.routing = (req, resp, isStatic) => {
    let param = [];
    let currentRoute = null;
    const {pathname} = url.parse(req.url);
    let urlParts = pathname.split("/");
    const route =  {match:currentRoute,param:param};

    if(isStatic) return route;
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
       this.sendResponse(resp, 'No such service found', 404);
    }else if(currentRoute && currentRoute.auth && !token.verify(req.headers.authorization)){
       this.sendResponse(resp, 'The access token provided is expired', 401);
    }
    route.match = currentRoute;
    route.param = param;
    return route;
};