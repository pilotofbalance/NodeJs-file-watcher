const loginHandler = require('./controllers/login');
const logoutHandler = require('./controllers/logout');
const startHandler = require('./controllers/start');
const stopHandler = require('./controllers/stop');
const statusHandler = require('./controllers/status');
const viewHandler = require('./controllers/view');

//request URL - controller mapper and auth config
const routes = [
    {
        name : 'Mainview',
        auth : false,
        controller : viewHandler, 
        pattern: '/',
        method: 'GET'
    },
    {
        name : 'Login',
        auth : false,
        controller : loginHandler, 
        pattern : '/login',
        method: 'POST'
    },
    {
        name : 'Logout',
        auth : true,
        controller : logoutHandler, 
        pattern: '/logout',
        method: 'POST'
    },
    {
        name : 'Start',
        auth : true,
        controller : startHandler, 
        pattern: '/start',
        method: 'POST'
    },
    {
        name : 'Status',
        auth : true,
        controller : statusHandler, 
        pattern: '/status/{event}',
        method: 'GET'
    },
    {
        name : 'Stop',
        auth : true,
        controller : stopHandler, 
        pattern: '/stop',
        method: 'POST'
    }
];

module.exports = routes;