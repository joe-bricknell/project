const path = require('path');
const user = require('../user');

var router = (app) => {
    
    // render login page 
    app.route('/login').get((req, res) => {
        res.render(path.resolve ('views/login.ejs'));
    });

    // registration route
    app.route('/api/user').post((req, res) => {
        user.registerUser(app, req, res);
    });

    // login route
    app.route('/api/login').post((req, res) => {
        user.login(app, req, res);
    });

    // logout route
    app.route('/api/logout').get((req, res) => {
        user.logout(app, req, res);
    });
}

module.exports = router;