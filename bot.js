var Discord = require('discord.io');
var logger = require('winston');
var fs = require('fs');
var colorDot = ['online', 'idle', 'dnd'];
var stati = ['online <:gdot:515555085078495243>', 'idle <:ydot:515555085166706728>', 'do not disturb <:rdot:515555085158449201>'];
var ptlw = [':video_game: playing :video_game:', ':movie_camera: streaming :movie_camera:', ':headphones: listening to :headphones:', ':eyes: watching :eyes:'];
var disconnect = ['Do you... not love me anymore?', 'For how long though?', 'Why tho', 'I hate you too mate', 'UPGRADE TIME?', 'Back to my corner I guess.', 'I guess you lame dawgs cannot deal with a party animal such as myself.\nI am outta here.','_**Is this the end for our caped crusader?**_\n_**Will the knots win?**_\n_**Tune in next time on Yo-Yo Random Stangers!**_'];
var caseMess = '';
var roleList = ['Create Instant Invite','Kick Members','Ban Members','Administrator','Manage Channels','Manage Server','Add Reactions','View Audit Log','Priority Speaker','Error 512','View Channels','Send Messages','Send TTS Messages','Manage Messages','Embed Links','Attach Files','Read Message History','Mention Everyone','Use External Emojis','Error 524288','Connect','Speak','Mute Members','Deafen Members','Use Members','Use Voice Activity','Change Nickname','Manage Nicknames','Manage Roles','Manage Webhooks','Manage Emojis']
var prevDay;
var day;
var monthNumbers = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var playing = ['Yoyo simulator', 'God', 'Cat and Mouse', 'With the Past', 'With Physics'];
var listening = ['the screams of orphans', 'the voices in my head', 'the haters'];
var watching = ['you cry', 'the sun bake'];
var levels = [['Put on and adjust string','Wind string','Basic throw','Around the corner','Walk the dog','The creeper','The elevator'],
							['Throw the baby','Itzy-Bitzy baby','Jamacain flag','Rock the baby','One handed star','Eiffel Tower','Spelling Yo','The cross','Big Tokyo tower','Two handed star','3D spaceship','British flag','Four-Leaf clover','Rock the baby on the Eiffel Tower','Dog bite','Darth Vader.'],
							['Breakaway','Terminology','Man on flying trapeze','Man on flying trapeze corrections','Pinwheel','Brain scrambler','Brain twister','Reverse flip front mount','Side mount flips','Split bottom mount','Man on the flying trapeze and his brother','Double or nothing','Houdini mount','Under or nothing','One and a half side mount','Brent','Cross arm trapeze','Crazy 8','Kamikaze mount','Wrist mount'],
							['Halley\'s commet','Double trapeze','Zipper','Regenerations','Barrell roll','Split the atom','Skin the gerbal','Ripcord','Keychain','Buddha\'s Revenge','Superflow','Cold fusion','Rewind','Eli Hops','Boomerang','PopsvSnap GT','Wasabi GT','Figure 8','Whip to kamakazi mount','Locomotion','Catch style binds','Cross capture','Keymaker whip','1.5 hook','TMNT cafe','Mach 5','Magic drop and shockwave','Ninja vanish','McPhee tower','Satoshi tower','Slack trapeze','Jade whip','Iron whip','Grey poupon','Chopsticks switch','Chopsticks double or nothing','Chopsticks tower','Chop suey','Wax on, wax off','Titanium chopsticks','Gondola','The matrix','Roller coaster','Hydrogen bomb','Revolutions','Brent stole','Seasick','Pop n\' fresh','Boingy Boing','Gyroscopic flop','Hot grind','Kwyjibo','Calypso','Green revolution','Lord of the flies','Cross arm trapeze','Follow','Instant magic knot','Follow trapeze','Serpentine','Monochrome','Bouncy castle','Schmidt twist','Quantum slack','Ghost neck','Funny bone','Horizontal basics','Horizontal skin the gerbil','Mobius maneuver','Simple geometry','Horizontal circular Eli Hops','Horizontal behind the back','Horizontal Black Hops'],
							['none'],
							['none'],
							['none']];
var links = ['https://yoyotricks.com/yoyo-tricks/beginner-tricks/','https://yoyotricks.com/yoyo-tricks/picture-tricks/','https://yoyotricks.com/yoyo-tricks/string-trick-basics/','https://yoyotricks.com/yoyo-tricks/string-tricks/','https://yoyotricks.com/yoyo-tricks/unresponsive/','https://yoyotricks.com/yoyo-tricks/long-string-tricks/','none'];
var roll = ['486667008881197066','486668435615383553','486668437360476177','486668450354429952','486668447833391137','486668446428299274','491801015436181504'];
var a = 0
var b = 0
var trickCom = ['level']
var imporCom = ['pin']
var infoCom = ['help','roleInfo']

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
    if (caseMess.includes('<@513203673644531712>') || caseMess == '<@513203673644531712>'){
        bot.sendMessage({
            to: channelID,
            embed: {
                title: 'The Helpful Yo-Yo Bot',
                author: {
                    name: 'Knot Ready For This',
                    icon_url: 'https://cdn.discordapp.com/avatars/513203673644531712/' + bot.users['513203673644531712'].avatar + '.png?size=32',
                },
                footer: {
                    icon_url: 'https://cdn.discordapp.com/avatars/513203673644531712/' + bot.users['513203673644531712'].avatar + '.png?size=32',
                    text: 'Startup Information',
                },
                timestamp: new Date(),
                color: 3050971,
        	    fields: [
                    {
                        name: 'Basic Information',
                        value: 'My prefix is: yo',
                   	},
                    {
                    	name: 'Starting Information',
                      	value: 'Type ``yo help`` to begin.\nThis will display my commands.'}]}})
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
				bot.addReaction({
					channelID: channelID,
					messageID: res.id,
					reaction: '1\u20e3'
				});
			});
		break;
        case 'PIN':
            bot.sendMessage({
                to: channelID,
                message: caseMess.substring(7, caseMess.length) + '\n\n-' + bot.fixMessage("<@" + userID + ">").substring(1, bot.fixMessage("<@" + userID + ">").length)
            }, function(err, res) {
                bot.pinMessage({
                    channelID: channelID,
                    messageID: res.id})})
        break;
        case 'ROLEINFO':
            var permi = 0
            if (message.substring(9, 12) == '<@&'){
                permi = message.substring(12, 30)
            }
            if (message.substring(9, 12) != '<@&'){
                permi = message.substring(9, 27)
            }
            var roleUserID = permi
	    if (Object.values(bot.servers[serverID].roles).find(r => r.id  == roleUserID) != undefined){
	            permi = Object.values(bot.servers[serverID].roles).find(r => r.id  == roleUserID)._permissions
	    }
	    if (Object.values(bot.servers[serverID].roles).find(r => r.id  == roleUserID) == undefined){
	            console.log(Object.values(bot.servers[serverID].roles).find(r => r.id  == roleUserID))
	    }
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
            b = 0
            while (a > 0){
                a = a - 1
                if (binaryPerm[binaryPerm.length - a] && b < 9){
                    b = b + 1
                    roleString = roleString + '\n          ' + b.toString() + ': ' + roleList[a - 1]
                }
                if (binaryPerm[binaryPerm.length - a] && b >= 9){
                    b = b + 1
                    roleString = roleString + '\n         ' + b.toString() + ': ' + roleList[a - 1]
                }
            }
            var roleHelper = '```prolog\n       Name: "' + Object.values(bot.servers[serverID].roles).find(r => r.id  == roleUserID).name + '"\n         ID: ' + Object.values(bot.servers[serverID].roles).find(r => r.id  == roleUserID).id + '\n   Position: ' + Object.values(bot.servers[serverID].roles).find(r => r.id  == roleUserID).position + '\n    Managed: '
            if (Object.values(bot.servers[serverID].roles).find(r => r.id  == roleUserID).managed){
                roleHelper = roleHelper + 'yes'
            }
            if (Object.values(bot.servers[serverID].roles).find(r => r.id  == roleUserID).managed == false){
                roleHelper = roleHelper + 'no'
            }
            roleHelper = roleHelper + '\nMentionable: '
            if (Object.values(bot.servers[serverID].roles).find(r => r.id  == roleUserID).mentionable){
                roleHelper = roleHelper + 'yes'
            }
            if (Object.values(bot.servers[serverID].roles).find(r => r.id  == roleUserID).mentionable == false){
                roleHelper = roleHelper + 'no'
            }
            roleHelper = roleHelper + '\n      Hoist: '
            if (Object.values(bot.servers[serverID].roles).find(r => r.id  == roleUserID).hoist){
                roleHelper = roleHelper + 'displayed seperately'
            }
            if (Object.values(bot.servers[serverID].roles).find(r => r.id  == roleUserID).hoist == false){
                roleHelper = roleHelper + 'not displayed seperately'
	    }
            bot.sendMessage({
                to: channelID,
                message: roleHelper + '\n      Color: ' + Object.values(bot.servers[serverID].roles).find(r => r.id  == roleUserID).color + '\nPermissions:' + roleString.toLowerCase() + '\n```'})
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
		case 'CHECKLIST':
			if (bot.server['429446593792442369'].roles[member.roles[0]] = '486676069492195348'){
				let peeps = [];
				let peepsIds = [];
				let peepsChannels = [];
				bot.getMessage({
					channelID: '557342910576721920',
					messageID: '566070246860128267'
				}, function(err,res){
					let oororo = res.content;
					for(let idx = 0; oororo.includes(','); oororo = oororo.substring(oororo.indexOf(',') + 2)){
						peeps.push(oororo.substring(0, oororo.substring(',')));
					}
					peeps.push(oororo)
				});
				bot.getMessage({
					channelID: '557342910576721920',
					messageID: '566070406138691605'
				}, function(err,res){
					let oororor = res.content;
					for(let idx = 0; oororor.includes(','); oororor = oororor.substring(oororor.indexOf(',') + 2)){
						peeps.push(oororor.substring(0, oororor.substring(',')));
					}
					peepsIds.push(oororor)
				});
				bot.getMessage({
					channelID: '557342910576721920',
					messageID: '566070246860128267'
				}, function(err,res){
					let oorororr = res.content;
					for(let idx = 0; oorororr.includes(','); oorororr = oorororr.substring(oorororr.indexOf(',') + 2)){
						peeps.push(oorororr.substring(0, oorororr.substring(',')));
					}
					peepsChannels.push(oorororr)
				});
				if (evt.d.mentions[0] != undefined){
					let run = true;
					let idx = 0;
					for (idx = 0; idx < peepsIds.length && run; idx++){
						if (evt.d.mentions[0].id = peepsIds[idx]){
							run = false;
						}
					}
					if (run = false){
						bot.getMessage({
							channelID: '557342935390355456',
							messageID: peepsChannels[idx]
						}, function(errr, ress){
							if(ress.content.substring(ress.indexOf('n'), ress.indexOf('n') + 1) = 'Y'){
								bot.sendMessage({
									to: channelID,
									message: 'Working'
								});
							}
						});
					}
				}
			} else {
				bot.sendMessage({
					to: channelID,
					message: 'This command is currently in testing phases. Please wait.'
				});
			}
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
				var outa = [];
				var outb = [];
				var outc = [];
				a = 0;
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
				var outd = [];
				var oute = [];
				var outf = [];
				var outg = '';
				var outh = '';
				var outi = '';
				a = 0;
				b = 0;
				while (a < outa.length){
					b = 0;
					outg = '';
					outh = '';
					outi = '';
					while (b < 10){
						if (outa.length > 10*a + b){
							outg = outg + '\n' + outa[10*a + b];
						}
						if (outb.length > 10*a + b){
							outh = outh + '\n' + outb[10*a + b];
						}
						if (outc.length > 10*a + b){
							outi = outi + '\n' + outc[10*a + b];
						}
						b = b + 1;
					}
					outd[a] = outg;
					oute[a] = outh;
					outf[a] = outi;
					a = a + 1;
				}
				a = new Date()
				bot.sendMessage({
					to: channelID,
					embed: {
						title: 'Level ' + (finalRole + 1),
						timestamp: a,
						author: {
							name: 'Knot Ready For This',
							url: 'https://yoyotricks.com/',
							icon_url: 'https://cdn.discordapp.com/avatars/513203673644531712/' + bot.users['513203673644531712'].avatar + '.png?size=32',
						},
						footer: {
							icon_url: 'https://cdn.discordapp.com/avatars/513203673644531712/' + bot.users['513203673644531712'].avatar + '.png?size=32',
							text: 'Level Command',
						},
						color: Object.values(bot.servers[serverID].roles).find(r => r.id  == topRoleID).color,
						fields: [
							{
								name: 'Column 1',
								value: outd[0],
								inline: true,
							},
							{
								name: 'Column 2',
								value: oute[0],
								inline: true,
							},
							{
								name: 'Column 3',
								value: outf[0],
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
            case 'HELP':
                if (message == 'HELP'){
                    var parta = ''
                    var partb = ''
                    var partc = ''
                    a = 0
                    while (a < trickCom.length || a < infoCom.length || a < imporCom.length){
                        if (a < trickCom.length){
                            parta = parta + ' `' + trickCom[a] + '`'
                        }
                        if (a < infoCom.length){
                            partb = partb + ' `' + infoCom[a] + '`'
                        }
                        if (a < imporCom.length){
                            partc = partc + ' `' + imporCom[a] + '`'
                        }
                        a = a + 1
                    }
                    bot.sendMessage({
                        to: channelID,
                        embed: {
                            title: 'This is the help section. Add `yo` to a command to use it.',
                            color: 3050971,
                            fields: [
                                {
                                    name: 'Help with tricks',
                                    value: parta,
                                },
                                {
                                    name: 'Informational Commands',
                                    value: partb,
                                },
                                {
                                    name: 'Important Announcement Commands',
                                    value: partc
                                }
                            ]
                        }})
                }
                if (message == 'HELP ROLEINFO'){
                    bot.sendMessage({
                        to: channelID,
                        message: '```md\nyo roleInfo {role}\n==================\n< role >\nThis can br a mention or ID of a role.\n< Purpose >\nThis will say the important information about a role.\n```'})
                }
                if (message == 'HELP PIN'){
                    bot.sendMessage({
                        to: channelID,
                        message: '```md\nyo pin {message}\n================\n< message >\nThis message will be pinned along with the user that sent it.\n< Purpose >\nThis will pin an important message to a channel.\n```'})
                }
                if (message == 'HELP LEVEL'){
                    bot.sendMessage({
                        to: channelID,
                        message: '```md\nyo level\n========\n< Purpose >\nThis will tell you your level and the tricks needed to advance in level.\n```'})
                }
                if (message == 'HELP HELP'){
                    bot.sendMessage({
                        to: channelID,
                        message: '```md\nyo help {command}\n=================\n< command >\nPut the command in question here.\nLeaving this blank will list all commands.\n< Purpose >\nThis will show the syntax and purpose of the command.\n```'})
                }
            break;
         }
     }
});
