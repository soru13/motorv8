module.exports = function (config) {
	/**
	 * Module dependencies.
	 */
	var routes = require('./controllers')
	var express = require('express');
	var routes = require('./routes');
	var cons = require('consolidate');
	var user = require('./routes/user');
	var path = require('path');
	var connect = require('connect');
	var website = require('./controllers/website')

	var app = express();
	// assign the swig engine to .html files
	app.engine('html', cons.swig);
	// all environments
	app.set('port', process.env.PORT || config.port );
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'html');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(connect.urlencoded())
	app.use(connect.json())
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
	app.get("/*", express.static(__dirname, 'public'));

	// development only
	if ('development' == app.get('env')) {
	  app.use(express.errorHandler());
	}
	/*
   * Routes
   */
	require('./routes')(app);

	return { app: app };

}
