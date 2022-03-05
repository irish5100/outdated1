const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color, Prefix } = require("../../config.js");

module.exports = {
  name: "help",
  aliases: ["h"],
  description: "Help Command!",
  usage: "Help | <Command Name>",
  run: async(client, message, args) => {
    
    
    
    let embed = new MessageEmbed()
    .setColor(Color)
    .setTitle(`${client.user.username} Commands!`)
    .setDescription(`Use ${Prefix}Help <Command Name> For More Command Information!` + 
    "\n\n**🤣 Fun [15]**\n`Avatar, Coinflip, Howgay, Meme, Rate, 8ball, Say, Dicksize, Ascii, Choose, Hack, Randomnumber, Roll, TacTactoe, Hangman`" + "\n\n" + "**🔨 Moderation [12]**\n`Clear, Mute, Unmute, Tempmute, Kick, Ban, Unban, Tempban, Warn, Warnings, ResetWarns, Antispam`" + "\n\n"+
    "**⚒️ Developer [9]**\n`Forceoff, Restart, Music_on, Music_off, mmode_on, mmode_off, errorscan, consoleusers, simjoin`" + "\n\n" + "**⭐ Images [8]**\n`cat, dog, bird, panda, fox, koala, Deepfry, Tweet`" + "\n\n" + "**🔍 Information [11]**\n`Help, Weather, Covid, Poll, Userinfo, Serverinfo, Ping, Credits, Leo, Irish, Phantom, Upcoming`"  + "\n\n" + "**📂 Upcoming Commands [5]**\n`Level, Leaderboard, Report, Suggest, Twitch`")
    .setFooter(`Requested By ${message.author.username}`)
    .setFooter(`Made By Zero Development.`);
    
    if (!args.length) return message.channel.send(embed);

    let cmd =
      client.commands.get(args[0].toLowerCase()) ||
      client.commands.get(client.aliases.get(args[0].toLowerCase()));

    let embed2 = new MessageEmbed()
      .setColor(Color)
      .setTitle(`${cmd.name} Information!`)
      .addField(`Aliases`, cmd.aliases || "None!")
      .addField(`Usage`, cmd.usage || "No Usage!")
      .addField(`Description`, cmd.description || "No Description!")
      .setFooter(`Made By Zero Development.`)
      .setTimestamp();

    if (cmd) {
      return message.channel.send(embed2);
    } else {
      return message.channel.send(embed);
    }
  }
};
