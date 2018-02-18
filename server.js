var fs = require('fs'),
        //cluster = require('cluster'),
        http = require('http'),
        config = require('./config');


/*if(cluster.isMaster) {
        for(var i = 0; i < require('os').cpus().length; i++) {
                cluster.fork();
        }

        cluster.on('exit', function (worker, code, signal) {
                console.log('worker ' + worker.process.pid + ' died');
                cluster.fork();
                console.log('worker restarted');
        });
} else {*/

        // aplication
        var app = require('./app')(config);

        app = app.app;

        /*
        * Server configuration
        */
        server=http.createServer(app);
        
         // io
        //require('./io')(server);
       

        /*
        * Bootstrap
        */
        server.listen(app.get('port'), function(){
                console.log("ondeado server listening on port "+app.get('port'));
        });
        
        
//}