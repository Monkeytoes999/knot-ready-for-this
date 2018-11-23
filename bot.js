var Discord = require('discord.io');
var logger = require('winston');
var fs = require('fs');
var colorDot = ['online', 'idle', 'dnd'];
var stati = ['online <:gdot:515555085078495243>', 'idle <:ydot:515555085166706728>', 'do not disturb <:rdot:515555085158449201>'];
var ptlw = [':video_game: playing :video_game:', ':movie_camera: streaming :movie_camera:', ':headphones: listening to :headphones:', ':eyes: watching :eyes:'];
var disconnect = ['Do you... not love me anymore?', 'For how long though?', 'Why tho', 'I hate you too mate', 'UPGRADE TIME?'];
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
		case 'TEST':
			bot.sendMessage({
			    to: channelID,
			    message: 'oof'
			}, function(err, res){
				console.log(res)
				for(var x = 0; x < 4; x = x){
					    bot.addReaction({
						channelID: channelID,
						messageID: res.id,
						reaction: x + '\u20e3'
					    }, function(err, res){
						    x++
					    });
				}
			});
		break;
		case 'GOAWAY':
			bot.sendMessage({
				to: channelID,
				message: disconnect[Math.floor(Math.random() * disconnect.length)]
			});
			bot.disconnect();
		break;
		case 'ING':
			if ((message.charCodeAt(4) > 47 && message.charCodeAt(4) < 52) && (userID == '393586279964475393' || userID == '486985623161274378')){
				bot.setPresence({
				    game: {
					    type: parseInt(message.substring(4, 5)),
					    name: caseMess.substring(9)
				    }
				});
				bot.sendMessage({
					to: channelID,
					message: 'I am now ' + ptlw[parseInt(message.substring(4,5))] + ' ' + caseMess.substring(9)
				});
			}
			break;
		case 'STATUS':
			if ((message.charCodeAt(7) > 48 && message.charCodeAt(7) < 52) && (userID == '393586279964475393' || userID == '486985623161274378')){
				bot.setPresence({
				    status: colorDot[parseInt((message.substring(7, 8)) - 1)]
				});
				bot.sendMessage({
					to: channelID,
					message: 'My status is now ' + stati[parseInt((message.substring(7, 8)) - 1)]
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
			if (topRoleID == '486667008881197066'){
				bot.sendMessage({
					to: channelID,
					 embed: {
						color: 65280,
						title: "**Level 1**",
						fields: [
						    {
							name: "The steps necesary for getting to level 2 are:",
							value: '\nPut on and adjust string.\nWind string.\nBasic throw.\nAround the corner.\nWalk the dog.\nThe creeper.\nThe elevator.\nThese tricks can be found on the link:\nhttps://yoyotricks.com/yoyo-tricks/beginner-tricks/'
						    }
							]
					 }
				});
			} else if (topRoleID == '486668435615383553'){
				bot.sendMessage({
					to: channelID,
					 embed: {
						color: 65280,
						title: "**Level 2**",
						fields: [
						    {
							name: "The steps necesary for getting to level 3 are:",
							value: '\nThrow the baby.\nItzy-Bitzy baby.\nJamacain flag.\nRock the baby.\nOne handed star.\nEiffel Tower.\nSpelling Yo.\nThe cross.\nBig Tokyo tower.\nTwo handed star\n3D spaceship.\nBritish flag.\nFour-Leaf clover.\nRock the baby on the Eiffel Tower.\nDog bite.\nDarth Vader.\nThese tricks can be found on the link:\nhttps://yoyotricks.com/yoyo-tricks/beginner-tricks/'
						    }
							]
					 }
				});
			} else if (topRoleID == '486668437360476177'){
				bot.sendMessage({
					to: channelID,
					 embed: {
						color: 65280,
						title: "**Level 3**",
						fields: [
						    {
							name: "The steps necesary for getting to level 4 are:",
							value: '\nBreakaway.\nTerminology.\nMan on flying trapeze.\nMan on flying trapeze corrections.\nPinwheel.\nBrain scrambler.\nBrain twister.\nReverse flip front mount.\nSide mount flips.\nSplit bottom mount.\nMan on the flying trapeze and his brother.\nDouble or nothing.\nHoudini mount.\nUnder or nothing.\nOne and a half side mount.\nBrent.\nCross arm trapeze.\nCrazy 8.\nKamikaze mount.\nWrist mount.\nThese tricks can be found on the link:\nhttps://yoyotricks.com/yoyo-tricks/string-trick-basics/'
						    }
							]
					 }
				});
			} else if (topRoleID == '486668450354429952'){
				bot.sendMessage({
					to: channelID,
					 embed: {
						color: 65280,
						title: "**Level 4**",
						fields: [
						    {
							name: "The steps necesary for getting to level 5 are:",
							value: '\nHalley\'s commet.\nDouble trapeze.\nZipper.\nRegenerations.\nBarrell roll.\nSplit the atom.\nMan on the flying trapeze and his brother.\nSkin the gerbal.\nRipcord.\nKeychain.\nBuddha\'s Revenge.\nSuperflow.\nCold fusion.\nRewind.\nEli Hops.\nBoomerang.\nPopsvSnap GT.\nWasabi GT.\nFigure 8.\nWhip to kamakazi mount.\nLocomotion.\nCatch style binds.\nCross capture.\nKeymaker whip.\n1.5 hook.\nTMNT cafe.\nMach 5.\nMagic drop and shockwave.\nNinja vanish.\nMcPhee tower.\nSatoshi tower.\nSlack trapeze.\nJade whip.\nIron whip.\nGrey poupon.\nChopsticks switch.\nChopsticks double or nothing.\nChopsticks tower.\nChop suey.\nWax on, wax off.\nTitanium chopsticks.\nGondola.\nThe matrix.'
						    }
							]
					 }
				}, function(err, res){
					bot.sendMessage({
						to: channelID,
						 embed: {
							color: 65280,
							title: "**Level 4**",
							fields: [
							    {
								name: "The steps necesary for getting to level 5 (continued) are:",
								value: 'Roller coaster.\nHydrogen bomb.\nRevolutions.\nBrent stole.\nSeasick.\nPop n\' fresh.\nBoingy Boing.\nGyroscopic flop.\nHot grind.\nKwyjibo.\nCalypso.\nGreen revolution.\nLord of the flies.\nCross arm trapeze.\nFollow.\nInstant magic knot.\nFollow trapeze.\nSerpentine.\nMonochrome.\nBouncy castle.\nSchmidt twist.\nQuantum slack.\nGhost neck.\nFunny bone.\nHorizontal basics.\nHorizontal skin the gerbil.\nMobius maneuver.\nSimple geometry.\nHorizontal circular Eli Hops.\nHorizontal behind the back.\nHorizontal Black Hops.\nThese tricks can be found on the link:\nhttps://yoyotricks.com/yoyo-tricks/string-tricks/'
							    }
								]
						 }
					});
				});
			} else if (topRoleID == '486668447833391137'){
				bot.sendMessage({
					to: channelID,
					 embed: {
						color: 65280,
						title: "**Level 5**",
						fields: [
						    {
							name: "The steps necesary for getting to level 6 are:",
							value: 'Not done yet'
						    }
							]
					 }
				});
			} else if (topRoleID == '486668446428299274'){
				bot.sendMessage({
					to: channelID,
					 embed: {
						color: 65280,
						title: "**Level 6**",
						fields: [
						    {
							name: "The steps necesary for getting to level 7 are:",
							value: 'Not done yet'
						    }
							]
					 }
				});
			} else if (topRoleID == '491801015436181504'){
				bot.sendMessage({
					to: channelID,
					message: 'You are a top-level Yoyo master. Nothing much I can do to help you'
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
