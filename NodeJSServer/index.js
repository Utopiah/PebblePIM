var fs = require('fs');

var WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({host:"5.39.79.30", port:"8889"});

wss.broadcast = function(data) {
  for (var i in this.clients)
    this.clients[i].send(data);
};
console.log('PIM web socket server started');

var pmWikiPath = "/home/web/benetou.fr/cloud/wiki/wiki.d/";
var pmWikiVersion = "version=urlencoded=1";
var pmWikiText = "";

var pebbleAccountIDWebTest = '0123456789abcdef0123456789abcdef';

var goodMomentIntensity = 0;
var badMomentIntensity = 0;
var ids = new Array();

// use like this:
wss.on('connection', function(ws) {
  console.log('client connected');
  ws.on('message', function(message) {
		  console.log(message);

	if (message == "down"){
		console.log('Bad moment!');
		badMomentIntensity++;
	}
	if (message == "up"){
		console.log('Good moment!');
		goodMomentIntensity++;
	}
	if (message.indexOf(":") !=-1) {
		ids = message.split(":");
	}
  });
  ws.on('close', function() {
		  console.log('client disconnected');
		  console.log('can now write the data to a Wiki file');
		  console.log('at time '+ids[0]+' user '+ids[1]+' had an intense moment.');
		  console.log('This moment was '+goodMomentIntensity+' good and '+badMomentIntensity+' bad.');
		  // record to file
		  // the server at the end of the minute will write a new PmWiki file
		  // just like http://fabien.benetou.fr/Portfolio/CoEvolution?action=source
		  // cf also http://www.pmwiki.org/wiki/PmWiki/PageFileFormat
		  var filename = 'CalendarMoments.'+ids[0]; // DD/MM/YYYY
		  pmWikiText = 'text=:gm:'+goodMomentIntensity+'%0a:bm:'+badMomentIntensity+'%0a:watch:'+ids[1]+'%0a';
		  var ctime = ids[0];
		  // the typical PmWiki calendar wouldn't work as several moments can appear per day

		  var stream = fs.createWriteStream(pmWikiPath+filename);
		  stream.once('open', function(fd) {
				  stream.write(pmWikiVersion+"\n");
				  stream.write(pmWikiText+"\n");
				  stream.write("ctime="+ctime+"\n");
				  stream.end();
				  });
		  goodMomentIntensity = 0;
		  badMomentIntensity = 0;
  });

});

process.stdin.on('data', function (data) {
	console.log('server sending message to all connected clients');
    wss.broadcast(data.toString());
});

