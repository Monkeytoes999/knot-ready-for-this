var Discord = require('discord.io');
var logger = require('winston');
var fs = require('fs');
var colorDot = ['online', 'idle', 'dnd'];
var caseMess = '';
var prevDay;
var day;
var monthNumbers = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var playing = ['Yoyo simulator'];
var listening = ['the screams of orphans'];
var watching = ['you cry'];

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

bot.on('any', function(event) {
    if (true){
			thisTime = new Date();
			let thisHour = (thisTime.getHours() - 5);
	    		let thisDay = thisTime.getDate();
	    		let thisMinute = thisTime.getMinutes()
			let thisSecond = thisTime.getSeconds()
			second = thisTime.getTime()
			if (thisHour < 0){
				thisHour = 24 + thisHour;
				thisDay = thisDay - 1;
			}
	  		if (thisDay < 1){
				thisDay = monthNumbers[thisTime.getMonth()];
			}
	        
	    hoursUntil = (23 - thisHour);
	    minutesUntil = (59 - thisMinute);
	    secondsUntil = (59 - thisSecond);
		
		prevDay = day;
		day = thisDay;
	    if (prevDay != day){
		    let num1 = Math.floor(Math.random() * 3);
		    if (num1 == 1){
		    	bot.setPresence({
				 game: {
					 type: 0,
					 name: playing[Math.floor(Math.random() * playing.length)]
				 }
			 });
		    } else if(num1 == 2){
		   	 bot.setPresence({
				 game: {
					 type: 2,
					 name: listening[Math.floor(Math.random() * playing.length)]
				 }
			 });
		    } else {
			bot.setPresence({
				 game: {
					 type: 3,
					 name: watching[Math.floor(Math.random() * playing.length)]
				 }
			 });
		    }
			    
	    }
    }
});

bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
	
	caseMess = message
	message = message.toUpperCase();
	
	if (!bot.directMessages[channelID]) {
		serverID = bot.channels[channelID].guild_id;
		channel = bot.channels[channelID];
		member = bot.servers[serverID].members[userID];
	}
	
	
	if (message.substring(0, 2) == 'YO') {
	message = message.substring(2).trim()
        var args = message.split(' ');
        var cmd = args[0];
			
        args = args.splice(1);
        switch(cmd) {
            // !ping
		case 'ING':
			if ((message.charCodeAt(4) > 47 && message.charCodeAt(4) < 52) && (userID == '393586279964475393' || userID == '486985623161274378')){
				bot.setPresence({
				    game: {
					    type: parseInt(message.substring(4, 5)),
					    name: caseMess.substring(9)
				    }
				});
			}
			break;
		case 'STATUS':
			if ((message.charCodeAt(7) > 48 && message.charCodeAt(7) < 52) && (userID == '393586279964475393' || userID == '486985623161274378')){
				bot.setPresence({
				    status: colorDot[parseInt((message.substring(7, 8)) - 1)]
				});
			}
		break;
		case 'LEVEL':
			let topRoleID = '';
			for (var iooof = 0; iooof < member.roles.length; iooof++){
				if (bot.servers['429446593792442369'].roles[member.roles[iooof]].position < 17){
					topRoleID = bot.servers['429446593792442369'].roles[member.roles[iooof]].id
				}
			}
			bot.sendMessage({
				to: channelID,
				message: topRoleID
			});
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
