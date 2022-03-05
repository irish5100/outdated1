const Discord = require("discord.js");
const client = new Discord.Client();
const nuke = require("discord-channel-nuke");
const { Color } = require("../../config.js");
var prefix = "!"; // your prefix
//client.on("message", message => {

module.exports = {
  name: "nuke",
  aliases: [],
  description: "Deletes All Messages From A Given Channel!",
  usage: "nuke",
  run: async (client, message, args) => {

  
// let Reason = args.slice(1).join(" ");

  
if(message.content.toLowerCase() === prefix + "nuke"){

if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(":x: Invalid Permissions. \n\n> `ADMINISTRATOR`\n\n");

nuke(message, new Discord.MessageEmbed()
        .setColor(Color)
        .setTitle(`Channel Nuked!`)
        .addField(`Moderator`, `${message.author.tag} (${message.author.id}`)
//        .addField(`Reason`, `${Reason || "No Reason Provided!"}`)
        .setImage(`https://media0.giphy.com/media/oe33xf3B50fsc/200.gif`)
        .setFooter(`Requested by ${message.author.username}`)
        .setTimestamp()
//        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
)

}
}};