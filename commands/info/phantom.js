const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../config.js");

module.exports = {
  name: "Phantom",
  aliases: [],
  description: "Gives details about Phantom!",
  usage: "Phantom",
  run: async (client, message, args) => {
    //Start
    

    const embed = new MessageEmbed()
      .setColor(Color)
      .setTitle(`**Who is Phantom?**`)
      .setDescription(`Phantom is second in command of Pacific Roleplay and a good friend of Irish, Phantom makes FiveM roleplay alot more realistic.`)
      .setFooter(`Requested By ${message.author.username}`)
      .setTimestamp();

    message.channel.send(embed);

    //End
  }
};
