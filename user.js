module.exports = {

    // inserts username and password into database
    registerUser: (app, req, res) => {
        app.get('database').collection('users').insertOne({ 'username': req.body.username, 'password': req.body.password }, (err, docs) => {
            if (err) return res.send(err)
            res.send(docs)
        });
    },

    // looks for username and password in database
    login: (app, req, res) => {
        app.get('database').collection('users').find({ 'username': req.body.username, 'password': req.body.password }).toArray((err, docs) => {
            if (err) {
                res.json({ 'error': 'Login Error' })
            } else if (docs.length < 1) {
                res.json({ 'error': 'Username or Password does not match' })
            } else {
                req.session.user = docs[0];
                res.json({ 'login': 'Login Successful!' })
            }
        })
    },

    // destroys session logging out user
    logout: (app, req, res) => {
        req.session.destroy();
        res.redirect('/login')
        console.log(req);
    }


}