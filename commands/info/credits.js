const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../config.js");

module.exports = {
  name: "credits",
  aliases: [],
  description: "Shows The Bots Credits.",
  usage: "credits",
  run: async (client, message, args) => {
    //Start
    

    const embed = new MessageEmbed()
      .setColor(Color)
      .setTitle(`**Credits**`)
      .setDescription(`
      **Zero Development**~ Main Company.
      **Irish#8057**~ Bot Developer/Maintainer.
      **Phantom161#3111**~ Bug Tester
      `)
      .setFooter(`Requested By ${message.author.username}`)
      .setTimestamp();

    message.channel.send(embed);

    //End
  }
};
