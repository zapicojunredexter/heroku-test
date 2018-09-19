var restify = require('restify'); 
var builder = require('botbuilder');  
// Setup Restify Server 
var server = restify.createServer(); 
server.listen(process.env.port || process.env.PORT || 3978, 
function () {    
    console.log('%s listening to %s', server.name, server.url);  
});  
// chat connector for communicating with the Bot Framework Service
var microsoftId = process.env.MICROSOFT_APP_ID || '2173fcca-27f3-4eaf-8da4-1a09be80b110';
var microsoftPassword = process.env.MICROSOFT_APP_PASSWORD || 'ltitIAYRS83{}|jfaAD924}';

var connector = new builder.ChatConnector({     
    appId: microsoftId,     
    appPassword: microsoftPassword
});
// Listen for messages from users  
// server.post('/api/messages', connector.listen());  
server.post('/api/messages', (req, res, cb)=>{
  connector.listen();
  res.status(204)
  res.send("requestes!" + JSON.stringify(connector));
  //return cb();

});  
// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:') 
  var bot = new builder.UniversalBot(connector, function (session) {     
  session.send("You said: %s", session.message.text); 
});


server.get('/testapi', function (req, res, cb) {
  res.send("Hello World!");
  return cb();
});