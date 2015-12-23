var UI = require('ui');

var configured = localStorage.getItem(0);

if (configured) {
  var wsserver = localStorage.getItem(1);
  var wsport = localStorage.getItem(2);
  
  var ws = new WebSocket("ws://"+wsserver+":"+wsport);
   
  var connected = false;
  
  var now = Date.now();
  var pebble = Pebble.getWatchToken();
  
  var main = new UI.Card({
    title: 'PIM memorable moments',
    subtitle: 'Disconnected',
    body: 'up +1 / down -1'
  });
  
  main.show();
  
  main.on('click', function(e) {
    if (connected){
       ws.send(e.button);
    }
    // once the connection has been established the user has 5 seconds to send
    // +1 point using the up button
    // -1 point using the up button
  }); 

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
  
  setTimeout(function(){
    ws.close(); 
    main.hide();
  }, 5*1000);
} else {
// if the app has never been configured there shouldn't even be a websocket server to connect to
  var config = new UI.Card({
    title: 'PIM memorable moments',
    subtitle: 'Not configured',
    body: 'Please add the WebSocket server and port first'
  });
  
  config.show();
}

Pebble.addEventListener('showConfiguration', function(e) {
  // Show config page
  Pebble.openURL('http://fabien.benetou.fr/pub/home/PebbleConfigurations/PIMSendSignals/');
});

Pebble.addEventListener('webviewclosed', function(e) {
  var config_data = JSON.parse(decodeURIComponent(e.response));
  console.log('Configuration window returned: ' + config_data);
  console.log(config_data.wsserver, config_data.wsport);
  
  localStorage.setItem(1, config_data.wsserver);
  localStorage.setItem(2, config_data.wsport);
  
  localStorage.setItem(0, true);
  // assuming it all went well
});
