const { ObjectId } = require('mongodb');

var router = (app) => {

    // get all todos
    app.route('/api/todos').get((req, res) => {
        app.get('database').collection('todos').find({'user':req.session.user.email}).toArray((err, result) => {
            res.render('index.ejs', { todos: result })
        });
    });

    // add a new todo
    app.route('/api/todos').post((req, res) => {
        req.body.shared = [];
        req.body.user = req.session.user.email;
        app.get('database').collection('todos').insertOne(req.body, (err, result) => {
            if (err) return console.log(err)

            console.log('saved to database')
            res.redirect('/api/todos');
        })
    });

    // update a todo name
    app.route('/api/todos/update/:id').post((req, res) => {
        app.get('database').collection('todos').updateOne(
            { '_id': new ObjectId(req.params.id) },
            {
                $set: {
                    'todo': req.body.todo
                },
            }, {
            }, (err, result) => {
                if (err) return res.send(err)
                res.send(result)
            })
    });
    
    // update todo status
    app.route('/api/todos/updateStatus/:id').post((req, res) => {
        app.get('database').collection('todos').updateOne(
            { '_id': new ObjectId(req.params.id) },
            {
                $set: {
                    'status': req.body.status
                },
            }, {
            }, (err, result) => {
                if (err) return res.send(err)
                res.send(result)
            })
    });

    // delete todo
    app.route('/api/todos/delete/:id').delete((req, res) => {
        app.get('database').collection('todos').deleteOne({ '_id': new ObjectId(req.params.id) }, (err, result) => {
            if (err) {
                console.log(err)
            }
            res.redirect('/todos');
        });
    });

    // add todo to shared todos
    app.route('/api/todos/share').post((req,res) => {
        app.get('database').collection('todos').updateOne({ '_id': new ObjectId(req.body.id) }, {$push : {'shared': req.body.email}}, (err, docs) => {
            if(err) {
                res.json(err)
            } else {
                res.json({'msg':'Share Successful'})
            }
        });
    });

    // get shared todos
    app.route('/api/todos/getSharedTodos').get((req,res) => {
        app.get('database').collection('todos').find({'shared':req.session.user.email}).toArray((err,docs) => {
            if(err) {
                res.json(err)
            } else {
                res.json(docs)
            }
        })
    });

}

module.exports = router;