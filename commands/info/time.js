const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../config.js");

module.exports = {
  name: "time",
  aliases: [],
  description: "Tells You The Current Time!",
  usage: "Time",
  run: async (client, message, args) => {
    //Start
    

    const embed = new MessageEmbed()
      .setColor(Color)
      .setDescription(`Time -`) .setTimestamp()
      .setFooter(`Requested By ${message.author.username}`)
 //     .setTimestamp();

    message.channel.send(embed);

    //End
  }
};
