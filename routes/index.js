var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/test', function(req, res, next) {
    if (!req.session.asd) {
        req.session.asd = 0;
    }
    ++req.session.asd;
    req.session.save(function() {
        res.jsonp({
            data: 'john doe is smartest!',
            pid: process.pid,
            sessionId: req.cookies['connect.sid']
        });
    });
});

module.exports = router;
