'use strict';

var config  = require( process.cwd() + '/config' );
var request = require( 'request' );
var Promise = require( 'bluebird' );

function getBasicAuth ( user, pass ) {
	return new Buffer( user + ':' + pass ).toString( 'base64' );
}

function RabbitManagementAPI( options ) {
	// config are default
	var con     = config.connection;
	options     = options || con;
	this.server = options.server || con.server;
	this.port   = options.port || con.port;
	this.vhost  = options.vhost || con.vhost;
	this.user   = options.user || con.user;
	this.pass   = options.pass || con.pass;
}

RabbitManagementAPI.prototype.request = function ( requestData ) {

	return new Promise( function( resolve, reject ) {

		request[ requestData.method ]( {

			'uri'     : 'http://' + this.server + ':' + this.port + requestData.path,
			'headers' : {
				'Authorization' : 'Basic ' + getBasicAuth( this.user, this.pass )
			},

			'qs'   : requestData.qs || {},
			'body' : JSON.stringify( requestData.body || {} )

		}, function ( error, load, body ) {

			if ( error ) {
				return reject( error );
			}

			body = JSON.parse( body );
			resolve( body );
		} );
	}.bind( this ) );

};

module.exports = RabbitManagementAPI;