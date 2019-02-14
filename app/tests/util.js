const assert = require("assert");
const config = require('../../config.json');
const http = require('http');

exports.describe = (testcase, callback) => {
  console.log('\x1b[33m%s\x1b[0m',testcase);
  callback();
}

exports.it = (description, callback) =>{
  try {
    callback();
    console.log('\x1b[32m%s\x1b[0m',`\t v ${description}`);
  } catch (e) {
    console.log('\x1b[31m%s\x1b[0m',`\t x ${description}`);
  }
}
exports.expect = (actual) => {
  return {
    toEqual(expected) {
      assert.equal(actual, expected);
    },
    toBe(expected) {
      assert.deepStrictEqual(actual, expected);
    },
    toBeTruthy() {
      assert.ok(actual);
    },
    toHaveLength(expected) {
      assert.ok(actual.length === expected);
    }
  };
}

exports.prom = (callback)=>{
	const promise = new Promise((resolve, reject) => {
	  setTimeout(function() {
	    resolve(callback());
	  }, 100);
	});
	return promise;
}

//promisify http requests
exports.request = (path,method,data,token)=>{
	return new Promise(function(resolve, reject) {
        const options = {
		  hostname: 'localhost',
		  port: config.port,
		  path: path,
		  method: method,
		  headers: {
		    'Content-Type': 'application/json',
		    'Authorization': token ? token : ''
		  }
		}
		var req = http.request(options, (res)=> {
		    var responseString = "";

		    res.on("data", (data)=> {
		        responseString += data;
		    });
		    res.on("end", ()=> {
		        resolve(JSON.parse(responseString));
		    });
		    res.on("error",(error)=>{
		    	reject(error);
		    });
	    });
	    req.write(JSON.stringify(data));
	    req.end();
    });
}