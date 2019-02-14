const Log = require('../models/log');

let currentWatch;
let stack = [];

/*initiate recursive watcher function and catch all fired events
    fs - recursive file system event listener
    filepath - filepath for observing changes
*/
exports.init = (fs, filepath)=>{
    currentWatch = fs.watch(filepath, (e, file)=>{watcher(e, file, fs, filepath)});
}

//copy logs from stack and clean him
exports.events = ()=>{
    const currentStack = [...stack];
    stack = [];
    return currentStack;
}

//close recursive file system event listener
exports.stop = ()=>{
    currentWatch ? currentWatch.close() : null;
}

//callback function for recursive event listener
const watcher = (event, targetfile, fs, filepath)=>{
		if(targetfile != null && event == 'rename'){
            //get statistics for specified file
			fs.stat(`${filepath}/${targetfile}`, (err, stats)=> {
             let msg;
             if(!stats && err){
             	msg = `(REMOVE) FILE ${targetfile} HAS BEEN REMOVED`;
             	//console.log(msg);
             }else if(stats && !err){
             	const isCreated = stats.ctimeMs - stats.mtimeMs === 0 ? true : false;
             	if(isCreated){
             		msg = `(ADD) FILE ${targetfile} HAS BEEN ADDED`;
                    //console.log(msg);
             	}else{
                    const prevFile = stack.pop();
                    if(prevFile){
                        msg = `(RENAME) FILE ${prevFile.file} HAS BEEN RENAMED TO ${targetfile}`;
                        //console.log(msg);
                    }
             	}
             }
             const date = this.format(new Date());
             stack.push(new Log(date,targetfile,msg));
			});
		}
}

//date format TODO: put to utils 
exports.format = (date)=>{
    const options = { year: '2-digit', month: '2-digit', day: '2-digit', 'hour': '2-digit' ,'minute':'2-digit','second':'2-digit','hour12':false};
    return new Date().toLocaleDateString('en-GB', options);
}
