const assert = require("assert");

exports.describe = (testcase, callback) => {
  console.log('\x1b[33m%s\x1b[0m',testcase);
  callback();
}

exports.it = (description, callback) =>{
  try {
    callback();
    console.log('\x1b[32m%s\x1b[0m',`\t ✓ ${description}`);
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
	  }, 10);
	});
	return promise;
}