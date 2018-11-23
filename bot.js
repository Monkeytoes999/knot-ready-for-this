var Discord = require('discord.io');
var logger = require('winston');
var fs = require('fs');
var colorDot = ['online', 'idle', 'dnd'];

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: process.env.token,
   autorun: true
});

bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
	
	message = message.toUpperCase();
	
	if (message.substring(0, 2) == 'YO') {
	message = message.substring(2).trim()
        var args = message.split(' ');
        var cmd = args[0];
			
        args = args.splice(1);
        switch(cmd) {
            // !ping
		case 'STATUS':
			console.log(message)
			console.log(message.charCodeAt(6))
			if ((message.charCodeAt(6) > 48 && message.charCodeAt(6) < 52) && (userID == '393586279964475393' || userID == '486985623161274378')){
				console.log(colorDot[message.substring(6, 7)])
				bot.setPresence({
				    status: colorDot[message.substring(6, 7)]
				});
			}
		break;
            case 'PING':
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
            break;
         }
     }
});
