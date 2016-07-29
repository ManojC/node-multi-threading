var express = require('express');
var router = express.Router();
var memored = require('memored');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile('home.html', { root: './public' });
});

/* GET all to do items */
router.get('/get-list', function(req, res, next) {
    console.log('currently serving process id' + process.pid);
    memored.read('todo-list', function(err, value) {
        res.json(value);
    });
});

/* POST - save new to do item. */
router.post('/add-item', function(req, res, next) {

    memored.read('todo-list', function(err, value) {
        if (!value) {
            memored.store('todo-list', [req.body], function() {
                res.json(req.body);
            });
        } else {
            value.push(req.body);
            memored.store('todo-list', value, function() {
                res.json(req.body);
            });
        }
    });
});

module.exports = router;
