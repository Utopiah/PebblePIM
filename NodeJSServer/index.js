var fs = require('fs');

var data = fs.readFileSync('./config.json'),
    myObj, configuration;

try {
	configuration = JSON.parse(data);
	console.dir(configuration);
}
catch (err) {
	console.log('There has been an error parsing your JSON.')
		console.log(err);
}

var WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({host:configuration.wsip, port:configuration.port});

wss.broadcast = function(data) {
  for (var i in this.clients)
    this.clients[i].send(data);
};
console.log('PIM web socket server started');

var pmWikiVersion = "version=urlencoded=1";
var pmWikiText = "";

var goodMomentIntensity = 0;
var badMomentIntensity = 0;
var ids = new Array();

// use like this:
wss.on('connection', function(ws) {
  console.log('client connected');
  wss.broadcast('Connected');
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
		  if (ids[1] == configuration.pebbleAccountIDWeb || ids[1] == configuration.pebbleAccountID) {
		  console.log("proper ID, can write");
		  // record to file
		  // the server at the end of the minute will write a new PmWiki file
		  // just like http://fabien.benetou.fr/Portfolio/CoEvolution?action=source
		  // cf also http://www.pmwiki.org/wiki/PmWiki/PageFileFormat
		  var filename = 'CalendarMoments.'+ids[0]; // DD/MM/YYYY
		  pmWikiText = 'text=:gm:'+goodMomentIntensity+'%0a:bm:'+badMomentIntensity+'%0a:watch:'+ids[1]+'%0a';
		  var ctime = ids[0];
		  // the typical PmWiki calendar wouldn't work as several moments can appear per day

		  var stream = fs.createWriteStream(configuration.pmWikiPath+filename);
		  stream.once('open', function(fd) {
				  stream.write(pmWikiVersion+"\n");
				  stream.write(pmWikiText+"\n");
				  stream.write("ctime="+ctime+"\n");
				  stream.end();
				  });
		  goodMomentIntensity = 0;
		  badMomentIntensity = 0;
		  } else {
			  console.log("Improper ID, will NOT write.");
		  }
  });

});

process.stdin.on('data', function (data) {
	console.log('server sending message to all connected clients');
    wss.broadcast(data.toString());
});

