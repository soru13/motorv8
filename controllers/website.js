

exports.index = function (req, res, next) {
    res.render('index', {
        title: 'Consolidate.js'
    });
};
exports.cs3 = function (req, res, next) {
    res.render('css3', {
        title: 'Consolidate.js'
    });
};
exports.feedback = function (req, res, next) {
    if(req.user) {
        var f = new Feedback({
            questions: req.param('question', []),
            comment: req.param('comment', null),
            public: req.param('public', false),
            user: req.user
        });

        f.save(function () {});

        if(req.xhr) {
            res.send('OK');
        } else {
            res.redirect('/');
        }
    } else {
        if(req.xhr) {
            res.send('ERR');
        } else {
            res.redirect('/');
        }
    }
};

exports.salir = function (req, res) {
    req.logout();
    res.redirect('/');
};
exports.socket = function (req, res) {

};
exports.notFound = function (req, res) {
    res.status(404).render('404.html');
};