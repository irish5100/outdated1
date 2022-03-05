const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../config.js");

module.exports = {
  name: "irish",
  aliases: [],
  description: "Gives details about leader Irish!",
  usage: "irish",
  run: async (client, message, args) => {
    //Start
    

    const embed = new MessageEmbed()
      .setColor(Color)
      .setTitle(`**Who is Irish?**`)
      .setDescription(`Irish is the proud founder of Pacific Roleplay, he wants everyone to enjoy FiveM roleplaying and makes its the most realistic as possible.`)
      .setImage(`https://cdn.discordapp.com/avatars/829438800295624716/e1688fa8ca3a253dfd55a596e711e9f4.png`)
      .setFooter(`Requested By ${message.author.username}`)
      .setTimestamp();

    message.channel.send(embed);

    //End
  }
};
