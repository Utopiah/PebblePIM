var UI = require('ui');

var ws = new WebSocket('ws://fabien.benetou.fr:8889');    // Replace with IP of computer running server

var connected = false;

ws.onopen = function () { 
  ws.send('pebble sending memorable moment');
  console.log('pebble sending memorable moment');
  connected = true;
};


var main = new UI.Card({
  title: 'PIM memorable moments',
  icon: 'images/menu_icon.png',
  body: 'Press up for +1 and down for -1.'
});

main.show();

ws.onmessage = function (event) { 
 // should confirm that the message has been received
  main.body(event.data);
    console.log(event.data);
};

main.on('click', function(e) {
  main.subtitle('Button ' + e.button + ' pressed.');
  if (connected){
     ws.send(e.button + ' button pressed ');
  }
  // once the connection has been established the user has 1 minute to send
  // +1 point using the up button
  // -1 point using the up button
  // the server at the end of the minute will write a new PmWiki file
  // just like http://fabien.benetou.fr/Portfolio/CoEvolution?action=source
  // those can then be listed at the end of the day or week to easilly spot the most intense moments
});