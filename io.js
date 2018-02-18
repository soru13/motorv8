
module.exports = function (server) {
	
	var io = require('socket.io').listen(server);
	//JSON para controlar que no se repitan nombres
	var usuariosConectados = {};
	var usuariosConectadosID = {};
	var sockets =  {};
	var urlImagen =  {};
	var TiendasTerminadas = [{}];
	  io.set('transports', ['websocket']);
 
	  /**
	   * Hook `handleClient` method.
	   */

	io.sockets.on('connection', function (socket) {
		// hacemos referencia a la dependencia
		var mongodb = require('mongodb');
		 
		// obtenemos el server MongoDB que dejamos corriendo
		// *** el puerto 27017 es el default de MongoDB
		var server = new mongodb.Server("10.44.15.105", 27017, {});
		 
		// obtenemos la base de datos de prueba que creamos
		var dbTest = new mongodb.Db('RobotPython', server, {});
		 
		// abrimos la base pasando el callback para cuando esté lista para usar
		dbTest.open(function (error, client) {
		  if (error) throw error;
		 
		  //en el parámetro client recibimos el cliente para comenzar a hacer llamadas
		  //este parámetro sería lo mismo que hicimos por consola al llamar a mongo
		   
		  //Obtenemos la coleccion Error que creamos antes
		  var collection = new mongodb.Collection(client, 'MonitorV8');
		   
		  //disparamos un query buscando la tienda que habiamos insertado por robotPython
		  setInterval(myTimeoutFunction, 7000);
		  function myTimeoutFunction(){
		  	 collection.find().toArray(function(err, docs) {
			    socket.emit('DateMonitor', { Monitor:docs});
			  });
		  }
		});
		
	  socket.emit('news', { hello: 'welcome to the jungle by ONDEADO BERSERKER'});
	  
	  //Recibimos el nombre
	  socket.on("enviarNombre",function(dato,userID,urlImagenUsuario)
	  {
	    //Verificamos que ese nombre no existe
	    if(usuariosConectados[dato])
	    {
	      socket.emit("errorName");
	    }
	    else
	    {
	      //Lo asignamos a la socket y lo agregamos
	      socket.nickname = dato;
	      usuariosConectados[dato] = socket.nickname;
	      usuariosConectadosID[dato] = userID;
	      urlImagen[dato]=urlImagenUsuario;
	      sockets[userID] = socket.id;
	    }
	    data = [dato,usuariosConectados,usuariosConectadosID,sockets,urlImagen];
	    //Enviamos los datos de regreso a las sockets
	    io.sockets.emit("mensaje",data);
	  }); 
	  //Recibimos un nuevo msj y lo mandamos a todas las sockets
	  socket.on("enviarMensaje",function(mensaje,tokenSocked,tokenSockedlocal,img)
	  {
	    console.log("mensaje "+mensaje);
	    var data = [img,' '+socket.nickname+' : </span>',mensaje];
	    //socket.broadcast.emit('newMessage', data);//a todos menos al que envio
	    io.sockets.socket(tokenSocked).emit('newMessage', data,tokenSockedlocal,socket.nickname);
	    //io.sockets.emit("newMessage",data);//atodos incluyendo al que envio
	  });
	  //Se dispara cuando una socket se desconecta
	  socket.on('disconnect', function () 
	  {
	    //Eliminamos al usuario de los conectados
	    delete usuariosConectados[socket.nickname];
	    //Creamos un arreglo con los usuarios y el que se eliminó
	    data = [usuariosConectados,socket.nickname];
	    console.log(data);
	    //Mandamos la información a las Sockets
	    io.sockets.emit("usuarioDesconectado",data);
	  });
	  socket.on('Regiones',function(data){
	  	console.log("------------------------------------------------------------------"+data.region);
	  	io.sockets.emit('ShowNotification', data);//a todos menos al que envio
	  });

	});
}

