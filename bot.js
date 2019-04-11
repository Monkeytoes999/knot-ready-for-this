var Discord = require('discord.io');
var logger = require('winston');
var fs = require('fs');
var colorDot = ['online', 'idle', 'dnd'];
var stati = ['online <:gdot:515555085078495243>', 'idle <:ydot:515555085166706728>', 'do not disturb <:rdot:515555085158449201>'];
var ptlw = [':video_game: playing :video_game:', ':movie_camera: streaming :movie_camera:', ':headphones: listening to :headphones:', ':eyes: watching :eyes:'];
var disconnect = ['Do you... not love me anymore?', 'For how long though?', 'Why tho', 'I hate you too mate', 'UPGRADE TIME?'];
var caseMess = '';
var roleList = ['Create Instant Invite','Kick Members','Ban Members','Administrator','Manage Channels','Manage Server','Add Reactions','View Audit Log','Priority Speaker','Error 512','View Channels','Send Messages','Send TTS Messages','Manage Messages','Embed Links','Attach Files','Read Message History','Mention Everyone','Use External Emojis','Error 524288','Connect','Speak','Mute Members','Deafen Members','Use Members','Use Voice Activity','Change Nickname','Manage Nicknames','Manage Roles','Manage Webhooks','Manage Emojis']
var prevDay;
var day;
var monthNumbers = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var playing = ['Yoyo simulator'];
var listening = ['the screams of orphans'];
var watching = ['you cry'];
var levels = [['Put on and adjust string','Wind string','Basic throw','Around the corner','Walk the dog','The creeper','The elevator'],
							['Throw the baby','Itzy-Bitzy baby','Jamacain flag','Rock the baby','One handed star','Eiffel Tower','Spelling Yo','The cross','Big Tokyo tower','Two handed star','3D spaceship','British flag','Four-Leaf clover','Rock the baby on the Eiffel Tower','Dog bite','Darth Vader.'],
							['Breakaway','Terminology','Man on flying trapeze','Man on flying trapeze corrections','Pinwheel','Brain scrambler','Brain twister','Reverse flip front mount','Side mount flips','Split bottom mount','Man on the flying trapeze and his brother','Double or nothing','Houdini mount','Under or nothing','One and a half side mount','Brent','Cross arm trapeze','Crazy 8','Kamikaze mount','Wrist mount'],
							['Halley\'s commet','Double trapeze','Zipper','Regenerations','Barrell roll','Split the atom','Skin the gerbal','Ripcord','Keychain','Buddha\'s Revenge','Superflow','Cold fusion','Rewind','Eli Hops','Boomerang','PopsvSnap GT','Wasabi GT','Figure 8','Whip to kamakazi mount','Locomotion','Catch style binds','Cross capture','Keymaker whip','1.5 hook','TMNT cafe','Mach 5','Magic drop and shockwave','Ninja vanish','McPhee tower','Satoshi tower','Slack trapeze','Jade whip','Iron whip','Grey poupon','Chopsticks switch','Chopsticks double or nothing','Chopsticks tower','Chop suey','Wax on, wax off','Titanium chopsticks','Gondola','The matrix','Roller coaster','Hydrogen bomb','Revolutions','Brent stole','Seasick','Pop n\' fresh','Boingy Boing','Gyroscopic flop','Hot grind','Kwyjibo','Calypso','Green revolution','Lord of the flies','Cross arm trapeze','Follow','Instant magic knot','Follow trapeze','Serpentine','Monochrome','Bouncy castle','Schmidt twist','Quantum slack','Ghost neck','Funny bone','Horizontal basics','Horizontal skin the gerbil','Mobius maneuver','Simple geometry','Horizontal circular Eli Hops','Horizontal behind the back','Horizontal Black Hops'],
							['none'],
							['none'],
							['none']];
var links = ['https://yoyotricks.com/yoyo-tricks/beginner-tricks/','https://yoyotricks.com/yoyo-tricks/picture-tricks/','https://yoyotricks.com/yoyo-tricks/string-trick-basics/','https://yoyotricks.com/yoyo-tricks/string-tricks/','https://yoyotricks.com/yoyo-tricks/unresponsive/','https://yoyotricks.com/yoyo-tricks/long-string-tricks/','none'];
var roll = ['486667008881197066','486668435615383553','486668437360476177','486668450354429952','486668447833391137','486668446428299274','491801015436181504'];

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
			    message: 'I dunno'
			}, function(err, res){
				console.log(res)
				bot.addReaction({
					channelID: channelID,
					messageID: res.id,
					reaction: '1\u20e3'
				});
			});
		break;
        case 'ROLEINFO':
            var permi = 0
            if (message.substring(10, 13) == '<@&'){
                permi = message.substring(13, 31)
            }
            if (message.substring(10, 13) != '<@&'){
                permi = message.substring(10, 28)
            }
            var roleUserID = permi
            permi = Object.values(bot.servers[serverID].roles).find(r => r.id  == permi)._permissions
            var binaryPerm = []
            var count = 31
            while (count > 0){
                count = count - 1
                binaryPerm[binaryPerm.length] = false
                if (permi >= 2**count){
                    permi = permi - 2**count
                    binaryPerm[binaryPerm.length - 1] = true
                }
            }
            var roleString = ''
            a = binaryPerm.length
            while (a > 0){
                a = a - 1
                if (binaryPerm[binaryPerm.length - a]){
                    roleString = roleString + '\n             ' + roleList[a - 1]
                }
            }
            var roleHelper = '```prolog\n       Name: "' + Object.values(bot.servers[serverID].roles).find(r => r.id  == roleUserID).name + '"\n         ID: ' + Object.values(bot.servers[serverID].roles).find(r => r.id  == roleUserID).id + '\n   Position: ' + Object.values(bot.servers[serverID].roles).find(r => r.id  == roleUserID).position + '\n    Managed: '
            if (Object.values(bot.servers[serverID].roles).find(r => r.id  == roleUserID).managed){
                roleHelper = roleHelper + 'Yes'
            }
            if (Object.values(bot.servers[serverID].roles).find(r => r.id  == roleUserID).managed == false){
                roleHelper = roleHelper + 'No'
            }
            roleHelper = roleHelper + '\nMentionable: '
            if (Object.values(bot.servers[serverID].roles).find(r => r.id  == roleUserID).mentionable){
                roleHelper = roleHelper + 'Yes'
            }
            if (Object.values(bot.servers[serverID].roles).find(r => r.id  == roleUserID).mentionable == false){
                roleHelper = roleHelper + 'No'
            }
            roleHelper = roleHelper + '\n      Hoist: '
            if (Object.values(bot.servers[serverID].roles).find(r => r.id  == roleUserID).hoist){
                roleHelper = roleHelper + 'Displayed Seperately'
            }
            if (Object.values(bot.servers[serverID].roles).find(r => r.id  == roleUserID).hoist == false){
                roleHelper = roleHelper + 'Not Displayed Seperately'
            }
            bot.sendMessage({
                to: channelID,
                embed: {
                    title: 'Role Information',
                    color: Object.values(bot.servers[serverID].roles).find(r => r.id  == roleUserID).color,
                    fields: [
                        {
                            name: 'Complete list of Customized Features and Additions',
                            value: roleHelper + '\n      Color: ' + Object.values(bot.servers[serverID].roles).find(r => r.id  == roleUserID).color + '\nPermissions:' + roleString + '\n```'}]}})
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
					if (roll.includes(bot.servers['429446593792442369'].roles[member.roles[iooof]].id)){
						topRoleID = bot.servers['429446593792442369'].roles[member.roles[iooof]].id
					}
				}
			}
			var roleSearch = 0;
			var finalRole = -1;
			while (roleSearch < levels.length){
				if (roll[roleSearch] == topRoleID){
					finalRole = roleSearch;
				}
				roleSearch = roleSearch + 1;
			}
			if (finalRole >= 0){
				console.log('Detecting top role of ' + (finalRole));
				var outa = ['a'];
				var outb = ['b'];
				var outc = ['c'];
				var a = 0;
				while (a < levels[finalRole].length){
					if (a % 3 == 0){
						outa[outa.length] = levels[finalRole][a];
					}
					if (a % 3 == 1){
						outb[outb.length] = levels[finalRole][a];
					}
					if (a % 3 == 2){
						outc[outc.length] = levels[finalRole][a];
					}
					a = a + 1;
				}
				var outd = [''];
				var oute = [''];
				var outf = [''];
				var outg = ['','',''];
				a = 0;
				var b = 0;
				while (a < outa.length){
					b = 0;
					outg = ['','',''];
					while (b < 10){
						if (outa.length < 10*a + b){
							outg[0] = outg[0] + '\n' + outa[10*a + b];
						}
						if (outb.length < 10*a + b){
							outg[1] = outg[1] + '\n' + outb[10*a + b];
						}
						if (outc.length < 10*a + b){
							outg[2] = outg[2] + '\n' + outc[10*a + b];
						}
						b = b + 1;
					}
					outd[outd.length] = outg[0];
					oute[oute.length] = outg[1];
					outf[outf.length] = outg[2];
				}
				console.log('Here');
				bot.sendMessage({
					to: channelID,
					embed: {
						title: 'Level ' + (finalRole + 1),
						color: Object.values(bot.servers[serverID].roles).find(r => r.id  == topRoleID).color,
						fields: [
							{
								name: 'Test',
								value: outd[1],
								inline: true,
							},
							{
								name: 'TEST',
								value: oute[1],
								inline: true,
							},
							{
								name: 'test',
								value: outf[1],
								inline: true
				}]}})
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
