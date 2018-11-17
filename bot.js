var Discord = require('discord.io');
var logger = require('winston');
var fs = require('fs');

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
	
	if (message.substring(0, 2) == 'yo') {
	message = message.substring(2).trim()
        var args = message.split(' ');
        var cmd = args[0];
			
        args = args.splice(1);
        switch(cmd) {
            // !ping
            case 'Ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'pong!'
                });
            break;
         }
     }
});
