'use strict';

var Firebase = require('firebase');

var IonicPush = require('./ionic-push');
var config = require('./config.json');

var ref = new Firebase(config.firebase.url).child('items/alert');

ref.on('child_added', function(snapshot) {
	var entity = snapshot.val();
	var currentTime = Date.now();
	var diff = currentTime - snapshot.val().createDate;
	if (snapshot.ref().parent().key() === 'alert' && 
		diff < 100000 /*TODO push notification condition*/) {
		IonicPush.post('New item alert: ' + entity.name, {'itemId': snapshot.key()})
		.then((response) => {
			//console.log(JSON.parse(response));
			console.log('PUSH notification sent for item ' + snapshot.key());
		}).catch((error) => {
			console.log(error);
		});
	}
});

console.log('***Item notification sender started***');

