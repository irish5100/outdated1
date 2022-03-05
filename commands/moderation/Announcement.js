  
const Discord = require("discord.js")
const botconfig = require("../../config.js");

module.exports = {
  name: "Announcement",
  aliases: ["Announce"],
  description: "Makes An Announcement! - Only Works For Bot Developers!",
  usage: "announcement",
  run: async (client, message, args) => {

        if (message.author.id !== '000000000000000000') {
        if (message.author.id !== '829438800295624716')
            return message.channel.send(`Bot Developer Unverified - You Can Not Use This!`)
        }
        await message.channel.send(`Bot Developer Verified - Bot Is Making The Announcement...`).then(m => m.delete({timeout: 5000}));
    await message.channel.send(`@everyone New Announcement has Just been Made!!`)

    }
}