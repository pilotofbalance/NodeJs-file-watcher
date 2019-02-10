const loginHandler = require('./controllers/login');
const startHandler = require('./controllers/start');

const routes = [
    {
        name : 'Mainpage',
        auth : false,
        controller : 'pageHandler', 
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
        controller : 'logoutAction', 
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
        controller : 'statusAction', 
        pattern: '/status/{event}',
        method: 'GET'
    },
    {
        name : 'Stop',
        auth : true,
        controller : 'stopAction', 
        pattern: '/stop',
        method: 'POST'
    }
];

module.exports = routes;