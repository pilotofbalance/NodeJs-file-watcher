# Node.js task - file watcher

This light weight project created without any npm libruaries (server side only) for learning purposes and scalable as much as possible. 
It uses fs.watch API that is not 100% consistent across platforms, and could be unavailable in some situations.

All tests was done on Windows 7/10.

To configure user authentication pls change config.json file:
```
{
  "password" : {YOUR_PASSWORD},
  "username" : {YOUR_USERNAME},
  "expTime" : {SESSION_EXPIRATION_TIME} //in milliseconds,
  "port" : {WEB_SERVER_PORT},
  "testsPath" : {YOUR_FOLDER_PATH} //for tests only, example:"C:/MyFiles"
}
```

To start web server via cmd command: redirect to project folder and run node index.js or npm start.

To run tests, configure test path folder and run node app/tests/test.js or npm test.

Prerequirements : installed Nodejs enviroment and npm.
