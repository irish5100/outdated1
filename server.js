const Discord = require("discord.js");
const fs = require("fs");
const fetch = require('node-fetch')
const client = new Discord.Client();
const bot = new Discord.Client();
const { readdirSync, read } = require('fs');
const { join } = require('path');
const Levels = require('discord-xp');
const ms = require('ms')
const { Prefix, Token, Color } = require("./config.js");
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.db = require("quick.db");
client.login(Token);

 client.on("ready", async () => {
  console.log(`ready!`);
  client.user
   .setActivity(`Pacific Roleplay | !help`, { type: "WATCHING" })
// BOT IS UNDER MAINTENANCE.... PLEASE WAIT
 .catch(error => console.log(error));
 });

//client.on("guildMemberAdd", member => {
  //  const welcomeChannel = member.guild.channels.cache.find(channel => channel.name === '🌌welcome🌌')
    //welcomeChannel.send (`${member} Welcome to The Emerald Assassins SMP! Make sure you read <#831987492953129022> and enjoy your stay!`)
//})

//client.on("guildMemberRemove", member => {
  //  const welcomeChannel = member.guild.channels.cache.find(channel => channel.name === '😥goodbye-cruel-world😥')
    //welcomeChannel.send (`${member} just used their netherite pickaxe to escape through the void :C`)
//})



client.on("message", async message => {
  if (message.channel.type === "dm") return;
  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.member)
    message.member = await message.guild.fetchMember(message);

  if (message.content.match(new RegExp(`^<@!?${client.user.id}>`))) {
    return message.channel.send(`Bot Prefix: ${Prefix}`);
  }
});

let modules = ["fun", "info", "moderation"];

modules.forEach(function(module) {
  fs.readdir(`./commands/${module}`, function(err, files) {
    if (err)
      return new Error(
        "Missing Folder Of Commands! Example : Commands/<Folder>/<Command>.js"
      );
    files.forEach(function(file) {
      if (!file.endsWith(".js")) return;
      let command = require(`./commands/${module}/${file}`);
      console.log(`${command.name} Command Has Been Loaded - ✅`);
      if (command.name) client.commands.set(command.name, command);
      if (command.aliases) {
        command.aliases.forEach(alias =>
          client.aliases.set(alias, command.name)
        );
      }
      //if (command.aliases.length === 0) command.aliases = null;
    });
  });
});

client.on("message", async message => {
  if (message.channel.type === "dm") return;
  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.member)
    message.member = await message.guild.fetchMember(message);

  if (!message.content.startsWith(Prefix)) return;

  const args = message.content
    .slice(Prefix.length)
    .trim()
    .split(" ");
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  let command =
    client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));

  if (!command) return;

  if (command) {
    if (!message.guild.me.hasPermission("ADMINISTRATOR"))
      return message.channel.send(
        "I Don't Have Enough Permission To Use This Or Any Of My Commands | Require : Administrator"
      );
    command.run(client, message, args);
  }
  console.log(
    `User : ${message.author.tag} (${message.author.id}) Server : ${message.guild.name} (${message.guild.id}) Command : ${command.name}`
  );
  
});

//start anti-spam
const usersMap = new Map();
const LIMIT = 7;
const TIME = 1800000;
const DIFF = 3000;

client.on('message', async(message) => {
    if(message.author.bot) return;
    if(usersMap.has(message.author.id)) {
        const userData = usersMap.get(message.author.id);
        const { lastMessage, timer } = userData;
        const difference = message.createdTimestamp - lastMessage.createdTimestamp;
        let msgCount = userData.msgCount;
        console.log(difference);

        if(difference > DIFF) {
            clearTimeout(timer);
            console.log('Cleared Timeout');
            userData.msgCount = 1;
            userData.lastMessage = message;
            userData.timer = setTimeout(() => {
                usersMap.delete(message.author.id);
                console.log('Removed from map.')
            }, TIME);
            usersMap.set(message.author.id, userData)
        }
        else {
            ++msgCount;
            if(parseInt(msgCount) === LIMIT) {
                let muterole = message.guild.roles.cache.find(role => role.name === 'Muted');
                if(!muterole) {
                    try{
                        muterole = await message.guild.roles.create({
                            name : "muted",
                            permissions: []
                        })
                        message.guild.channels.cache.forEach(async (channel, id) => {
                            await channel.createOverwrite(muterole, {
                                SEND_MESSAGES: false,
                                ADD_REACTIONS : false
                            })
                        })
                    }catch (e) {
                        console.log(e)
                    }
                }
                message.member.roles.add(muterole);
                message.channel.send('You have been muted for spam!');
                setTimeout(() => {
                    message.member.roles.remove(muterole);
                    message.channel.send('You have been unmuted!')
                }, TIME);
            } else {
                userData.msgCount = msgCount;
                usersMap.set(message.author.id, userData);
            }
        }
    }
    else {
        let fn = setTimeout(() => {
            usersMap.delete(message.author.id);
            console.log('Removed from map.')
        }, TIME);
        usersMap.set(message.author.id, {
            msgCount: 1,
            lastMessage : message,
            timer : fn
        });
    }
})
//end

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
  
  // -------------------------------------- Blaclisted Words
  
})
client.on('message', msg => {
  if (msg.content.includes("nigga")) {
    msg.delete()
    msg.reply('Blacklisted Word Detected | Warning has been issued.');
  }
});
client.on('message', msg => {
  if (msg.content.includes("Nigga")) {
    msg.delete()
    msg.reply('Blacklisted Word Detected | Warning has been issued.');
  }
});
client.on('message', msg => {
  if (msg.content.includes("nIgga")) {
    msg.delete()
    msg.reply('Blacklisted Word Detected | Warning has been issued.');
  }
});
client.on('message', msg => {
  if (msg.content.includes("niGga")) {
    msg.delete()
    msg.reply('Blacklisted Word Detected | Warning has been issued.');
  }
});
client.on('message', msg => {
  if (msg.content.includes("nigGa")) {
    msg.delete()
    msg.reply('Blacklisted Word Detected | Warning has been issued.');
  }
});
client.on('message', msg => {
  if (msg.content.includes("niggA")) {
    msg.delete()
    msg.reply('Blacklisted Word Detected | Warning has been issued.');
  }
});
client.on('message', msg => {
  if (msg.content.includes("niga")) {
    msg.delete()
    msg.reply('Blacklisted Word Detected | Warning has been issued.');
  }
});
client.on('message', msg => {
  if (msg.content.includes("NIGGA")) {
    msg.delete()
    msg.reply('Blacklisted Word Detected | Warning has been issued.');
  }
});
client.on('message', msg => {
  if (msg.content.includes("nigger")) {
    msg.delete()
    msg.reply('Blacklisted Word Detected | Warning has been issued.');
  }
});
client.on('message', msg => {
  if (msg.content.includes("Nigger")) {
    msg.delete()
    msg.reply('Blacklisted Word Detected | Warning has been issued.');
  }
});
client.on('message', msg => {
  if (msg.content.includes("nIgger")) {
    msg.delete()
    msg.reply('Blacklisted Word Detected | Warning has been issued.');
  }
});
client.on('message', msg => {
  if (msg.content.includes("niGger")) {
    msg.delete()
    msg.reply('Blacklisted Word Detected | Warning has been issued.');
  }
});
client.on('message', msg => {
  if (msg.content.includes("nigGer")) {
    msg.delete()
    msg.reply('Blacklisted Word Detected | Warning has been issued.');
  }
});
client.on('message', msg => {
  if (msg.content.includes("niggEr")) {
    msg.delete()
    msg.reply('Blacklisted Word Detected | Warning has been issued.');
  }
});
client.on('message', msg => {
  if (msg.content.includes("niggeR")) {
    msg.delete()
    msg.reply('Blacklisted Word Detected | Warning has been issued.');
  }
});
client.on('message', msg => {
  if (msg.content.includes("niger")) {
    msg.delete()
    msg.reply('Blacklisted Word Detected | Warning has been issued.');
  }
});
client.on('message', msg => {
  if (msg.content.includes("NIGGER")) {
    msg.delete()
    msg.reply('Blacklisted Word Detected | Warning has been issued.');
  }
});
client.on('message', msg => {
  if (msg.content.includes("cunt")) {
    msg.delete()
    msg.reply('Blacklisted Word Detected | Warning has been issued.');
  }
});
client.on('message', msg => {
  if (msg.content.includes("Cunt")) {
    msg.delete()
    msg.reply('Blacklisted Word Detected | Warning has been issued.');
  }
});
client.on('message', msg => {
  if (msg.content.includes("cUnt")) {
    msg.delete()
    msg.reply('Blacklisted Word Detected | Warning has been issued.');
  }
});
client.on('message', msg => {
  if (msg.content.includes("cuNt")) {
    msg.delete()
    msg.reply('Blacklisted Word Detected | Warning has been issued.');
  }
});
client.on('message', msg => {
  if (msg.content.includes("cunT")) {
    msg.delete()
    msg.reply('Blacklisted Word Detected | Warning has been issued.');
  }
});
client.on('message', msg => {
  if (msg.content.includes("CUNT")) {
    msg.delete()
    msg.reply('Blacklisted Word Detected | Warning has been issued.');
  }
});
client.on('message', msg => {
  if (msg.content.includes("faggot")) {
    msg.delete()
    msg.reply('Blacklisted Word Detected | Warning has been issued.');
  }
});
client.on('message', msg => {
  if (msg.content.includes("Faggot")) {
    msg.delete()
    msg.reply('Blacklisted Word Detected | Warning has been issued.');
  }
});
client.on('message', msg => {
  if (msg.content.includes("fAggot")) {
    msg.delete()
    msg.reply('Blacklisted Word Detected | Warning has been issued.');
  }
});
client.on('message', msg => {
  if (msg.content.includes("faGgot")) {
    msg.delete()
    msg.reply('Blacklisted Word Detected | Warning has been issued.');
  }
});
client.on('message', msg => {
  if (msg.content.includes("fagGot")) {
    msg.delete()
    msg.reply('Blacklisted Word Detected | Warning has been issued.');
  }
});
client.on('message', msg => {
  if (msg.content.includes("faggOt")) {
    msg.delete()
    msg.reply('Blacklisted Word Detected | Warning has been issued.');
  }
});
client.on('message', msg => {
  if (msg.content.includes("faggoT")) {
    msg.delete()
    msg.reply('Blacklisted Word Detected | Warning has been issued.');
  }
});
client.on('message', msg => {
  if (msg.content.includes("fagot")) {
    msg.delete()
    msg.reply('Blacklisted Word Detected | Warning has been issued.');
  }
});
client.on('message', msg => {
  if (msg.content.includes("FAGGOT")) {
    msg.delete()
    msg.reply('Blacklisted Word Detected | Warning has been issued.');
  }
});
client.on('message', msg => {
  if (msg.content.includes("fag")) {
    msg.delete()
    msg.reply('Blacklisted Word Detected | Warning has been issued.');
  }
});
client.on('message', msg => {
  if (msg.content.includes("Fag")) {
    msg.delete()
    msg.reply('Blacklisted Word Detected | Warning has been issued.');
  }
});
client.on('message', msg => {
  if (msg.content.includes("fAg")) {
    msg.delete()
    msg.reply('Blacklisted Word Detected | Warning has been issued.');
  }
});
client.on('message', msg => {
  if (msg.content.includes("faG")) {
    msg.delete()
    msg.reply('Blacklisted Word Detected | Warning has been issued.');
  }
});
client.on('message', msg => {
  if (msg.content.includes("FAG")) {
    msg.delete()
    msg.reply('Blacklisted Word Detected | Warning has been issued.');
  }
});

  // -------------------------------------- Blaclisted Words End

client.on('message', msg => {
  if (msg.content.includes("discord.gg")) {
    msg.delete()
    msg.reply("Do Not Post Invite Links! Knock it off!")
  }
});
client.on('message', msg => {
  if (msg.content.includes("TEMPLATE1010")) {
    msg.reply("<@829438800295624716> <@759131481158844417> Noted Member has been mentioned.")
  }
});
//client.on('message', msg => {
  //if (msg.content.includes("-musicon")) {
    //msg.reply("Sorry That command is not working right now as the hosting servers are down! Sorry again!")
  //}
//});
client.on('message', msg => {
  if (msg.content === 'help') {
    msg.reply('If you need help with anything make sure you look in <#922798333985165333>. (THIS IS A AUTOMATED MESSAGE)');
  }
});
client.on('message', msg => {
  if (msg.content.includes("didntask")) {
    msg.reply('Uno Reverse!');
  }
});
client.on('message', msg => {
  if (msg.content.includes("@everyone")) {
    msg.reply('bruh why ping everyone..... ;-;');
  }
});
client.on('message', msg => {
  if (msg.content.includes("<@!829438800295624716>")) {
    msg.reply("Don't ping Irish.");
  }
});
client.on('message', msg => {
  if (msg.content.includes("@Irish")) {
    msg.reply("Don't ping Irish.");
  }
});
client.on('message', msg => {
  if (msg.content.includes("DEV.ONLINE")) {
    msg.reply(`Bot Status: 🟢  -  Ping: ${client.ws.ping}`);
  }
});


 // make sure you have ms installed by doing npm install ms in your console/terminal
const prefix = "."

client.once("ready" , () =>{
    console.log("I am online!")
});


           client.on('message', async message => {
              let args = message.content.substring(prefix.length).split(" ")
              if(message.member.permissions.has('ADMINISTRATOR')){
              if (message.content.startsWith(`${prefix}giveaway`)) {
                  let time = args[1]
                  if (!time) return message.channel.send('You did not specify a time!');
          
                  if (
                      !args[1].endsWith("d") &&
                      !args[1].endsWith("h") &&
                      !args[1].endsWith("m") &&
                      !args[1].endsWith("s") 
                  )
                      return message.channel.send('You need to use d (days), h (hours), m (minutes), or s (seconds)')
          
                      let gchannel = message.mentions.channels.first();
                      if (!gchannel) return message.channel.send("I can't find that channel in the server!")
          
                      let prize = args.slice(3).join(" ")
                      if (!prize) return message.channel.send('Arguement missing. What is the prize?')
          
                      message.delete()
                      gchannel.send(":tada: **NEW GIVEAWAY** :tada:")
                      let gembed = new Discord.MessageEmbed()
                          .setTitle("New Giveaway!")
                          .setDescription(`React with :tada: to enter the giveaway!\nHosted By: **${message.author}**\nTime: **${time}**\nPrize: **${prize}**`)
                          .setTimestamp(Date.now + ms(args[1]))
                          .setColor(3447003)
                      let n = await gchannel.send(gembed)
                      n.react("🎉")
                      setTimeout(() => {
                          if(n.reactions.cache.get("🎉").count <= 1) {
                              return message.channel.send("Not enough people for me to draw a winner!")
                          }
          
                          let winner = n.reactions.cache.get("🎉").users.cache.filter((u) => !u.bot).random();
                          gchannel.send(`Congratulations ${winner}! You just won the **${prize}**!`
                          );
                      }, ms(args[1]));
              }
            }
          })





//levels

// Levels.setURL("C")

//end

///////////////////////////////////////////////////////////////// NEW
// const Client = new Discord.Client({disableEveryone: true, partials: ['MESSAGE', 'REACTION']});

client.on('messageReactionAdd', async (reaction, user) => {
    const handleStarboard = async () => {
        const SBChannel = client.channels.cache.find(channel => channel.name.toLowerCase() === '⭐starboard');
        const msgs = await SBChannel.messages.fetch({ limit: 100 });
        const SentMessage = msgs.find(msg => 
            msg.embeds.length === 1 ?
            (msg.embeds[0].footer.text.startsWith(reaction.message.id) ? true : false) : false);
        if(SentMessage) SentMessage.edit(`${reaction.count} - ⭐`);
        else {
            const embed = new Discord.MessageEmbed()
            .setAuthor(reaction.message.author.tag, reaction.message.author.displayAvatarURL())
            .setDescription(`**[Jump to the message](${reaction.message.url})**\n\n${reaction.message.content}\n`)
            .setColor('YELLOW')
            .setFooter(reaction.message.id)
            .setTimestamp();
            if(SBChannel)
            SBChannel.send('1 - ⭐', embed);
        }
    }
    if(reaction.emoji.name === '⭐') {
        if(reaction.message.channel.name.toLowerCase() === '⭐starboard') return;
        if(reaction.message.partial) {
            await reaction.fetch();
            await reaction.message.fetch();
            handleStarboard();
        }
        else
        handleStarboard();
    }
});

///////////////////////////////////////////////////////////////// NEW




setInterval(async () => {
  await fetch('https://motley-oasis-account.glitch.me').then(console.log('Pinged!'))
}, 240000)
      
client.login(Token);