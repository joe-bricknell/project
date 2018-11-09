const path = require('path');
const user = require('../user');

var router = (app) => {
    app.route('/login').get((req, res) => {
        res.render(path.resolve ('views/login.ejs'));
    });

    app.route('/api/user').post((req, res) => {
        user.registerUser(app, req, res);
    });

    app.route('/api/login').post((req, res) => {
        user.login(app, req, res);
    });

}

module.exports = router;