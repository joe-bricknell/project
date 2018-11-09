module.exports = {
    registerUser: (app, req, res) => {
        app.get('database').collection('users').insertOne({ 'email': req.body.email, 'password': req.body.password }, (err, docs) => {
            if (err) return res.send(err)
            res.send(docs)
        });
    },

    login: (app, req, res) => {
        app.get('database').collection('users').find({ 'email': req.body.email, 'password': req.body.password }).toArray((err, docs) => {
            if (err) {
                res.json({ 'error': 'Login Error' })
            } else if (docs.length < 1) {
                res.json({ 'error': 'Username or Password does not match' })
            } else {
                req.session.user = docs[0];
                res.json({ 'login': 'Login Successful!' })
            }
        })
        
    }
}