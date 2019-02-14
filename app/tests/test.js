const fs = require('fs');
const assert = require('assert');
const watcher = require('../utils/watcher');
const {promisify} = require('util');
const util = require('./util');
const writeFile = promisify(fs.writeFile);
const unlinkFile = promisify(fs.unlink);
const renameFile = promisify(fs.rename);


async function testFileWatcher(){
	//initialize fs.watch file observer
	watcher.init(fs, 'C:/MyFiles');
	//add file and check that specified event fired
	await writeFile('C:/MyFiles/add_file.txt', 'Test File').then(() => console.log('')).catch(e => console.log(e));
	await util.prom(watcher.events).then((res)=>{
		console.log(res);
		util.describe('Test file add event', () => {
		  util.it('should catch adding file event', () => {
		    util.expect(res[0].event).toEqual('(ADD) FILE add_file.txt HAS BEEN ADDED');
		  });
		});
	});

    //rename file and check event
    await renameFile('C:/MyFiles/add_file.txt', 'C:/MyFiles/rename_file.txt').then(() => console.log('')).catch(e => console.log(e));
	await util.prom(watcher.events).then((res)=>{
		console.log(res);
		util.describe('Test file rename event', () => {
		  util.it('should catch renaming file event', () => {
		    util.expect(res[0].event).toEqual('(RENAME) FILE add_file.txt HAS BEEN RENAMED TO rename_file.txt');
		  });
		});
	});

    //remove file and check event
	await unlinkFile('C:/MyFiles/rename_file.txt').then(() => console.log()).catch(e => console.log(e));
	await util.prom(watcher.events).then((res)=>{
		console.log(res);
		util.describe('Test file remove event', () => {
		  util.it('should catch removing file event', () => {
		    util.expect(res[0].event).toEqual('(REMOVE) FILE rename_file.txt HAS BEEN REMOVED');
		  });
		});
	});
 
    //stop file observer
	await util.prom(watcher.stop);
}

testFileWatcher();
