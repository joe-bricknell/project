const path = require('path');
const express = require('express');
const MongoClient = require('mongodb').MongoClient
const session = require('express-session');
const fileStore = require('session-file-store')(session);
const loginRoutes = require('./routes/loginRoutes');
const routes = require('./routes/routes')

// create express app
const app = express();

app.use(session({
    name: 'session',
    secret: 'mySuperSecretSessionProject',
    resave: false,
    saveUninitialized: true,
    // create a new directory and create new session
    store: new fileStore(),
    // set timeout for inactivity (10 mins)
    maxAge: Date.now() + (10 * 10 * 1000)
}));

// parse json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// static files
app.use(express.static('./public'));
app.use(express.static('./node_modules'));

// set view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

let db = ""
// connect to mongodb
MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, (err, client) => {
    if (err) {
        console.log(err)
    }
    db = client.db('todoList')
    app.set('database', db);

    app.listen(3000, () => {
        console.log('Listening on 3000...')
    });
});

// create login route
loginRoutes(app);
routes(app);