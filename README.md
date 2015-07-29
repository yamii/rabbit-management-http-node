# Usage
```javascript
var rabbit = new RabbitManagementAPI();
rabbit.request( {
	'method' : 'get',
	'path'   : '/api/queues'
} )
.then( function ( data ) {
	console.log( data );
} )
.then( null, function ( error ) {
	console.log( error );
} );
```

###### Refer here
http://hg.rabbitmq.com/rabbitmq-management/raw-file/3646dee55e02/priv/www-api/help.html