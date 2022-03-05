  
const Discord = require("discord.js")
const botconfig = require("../../config.js");

module.exports = {
  name: "forceoff",
  aliases: ["forceoff"],
  description: "Shut Down The Bot - Only Works For Bot Developers!",
  usage: "forceoff",
  run: async (client, message, args) => {

    if(message.author.id != "829438800295624716") return message.channel.send("Bot Developer Unverified - You Can Not Use This!")

    try {
        await message.channel.send("Bot Developer Verified - Bot is shutting down...")
        process.exit()
    } catch(e) {
        message.channel.send(`ERROR: ${e.message}`)
    }
    


}
}