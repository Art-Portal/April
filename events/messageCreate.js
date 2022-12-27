const { guildId } = require('../config.json');

module.exports = {
    name: 'messageCreate',
    async execute(message, client) {
        if (message.guild.id != guildId) return;
        if (message.author.id == "718456289704804392" && message.content.toLowerCase().replace(/\? /).endsWith("quoi")){
            message.reply({ content: "feur"})
        }
    }
}
