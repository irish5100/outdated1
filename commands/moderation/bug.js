module.exports = {
    name: "bug",
    description: "Sends Your Reported Issue To The Staff Team.",

    async run (bot, message, args) {
        if(!args[0]) return message.reply('Please specify a issue!')

        message.reply(`✉ | ${message.author.username}, Thanks for reporting this issue! :)`)

        console.log('Bug: ' + `(username)` + message.author.username,'#'+message.author.discriminator, `(UserId)`+ message.author.id, `(serverName)`+message.guild.name, `(serverId)`+ message.guild.id)
    }
}