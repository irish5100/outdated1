const Discord = require("discord.js")
const botconfig = require("../../config.js");

module.exports = {
  name: "antispam",
  aliases: [],
  description: "Turns Anti-Spam On/Off! - Only Works For Server Staff!",
  usage: "antispam",
  run: async (client, message, args) => {

        if (message.author.id !== '000000000000000000') {
        if (message.author.id !== '829438800295624716')
            return message.channel.send(`Unverified - You Can Not Use This! (If you are staff please contact a bot developer.)`)
        }
        await message.channel.send(`🛡️~Anti-Spam Is Now Turned Off!~🛡️`)
        process.exit();
    }
}