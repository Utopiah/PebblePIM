var UI = require('ui');

var ws = new WebSocket('ws://fabien.benetou.fr:8889');
// Replace with IP of computer running server
// should be configurable
// cf https://developer.getpebble.com/guides/pebble-apps/pebblekit-js/app-configuration/

var connected = false;

var now = Date.now();
var pebble = Pebble.getWatchToken();

var main = new UI.Card({
  title: 'PIM memorable moments',
  subtitle: 'Disconnected',
  body: 'up +1 / down -1'
});

main.show();

ws.onopen = function () {
  ws.send(now+':'+pebble);
  connected = true;
  // somehow doesn't update the card value
};

ws.onmessage = function (event) {
  main.subtitle(event.data);
  // somehow receiving confirmation makes the closing way WAY slower...
  // despite the forced ws.close !
};

main.on('click', function(e) {
  if (connected){
     ws.send(e.button);
  }
  // once the connection has been established the user has 5 seconds to send
  // +1 point using the up button
  // -1 point using the up button
});

setTimeout(function(){
  ws.close(); 
  main.hide();
}, 5*1000);