var UI = require('ui');

var ws = new WebSocket('ws://fabien.benetou.fr:8889');    // Replace with IP of computer running server

var connected = false;

var now = Date.now();
var pebble = Pebble.getWatchToken();

ws.onopen = function () { 
  ws.send(now+':'+pebble);
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
  if (connected){
     ws.send(e.button);
  }
  // once the connection has been established the user has 1 minute to send
  // +1 point using the up button
  // -1 point using the up button
});

setTimeout(function(){
  ws.close(); 
  main.hide();
}, 15*1000);