const { guildId } = require('../config.json');
const { buttonList } = require('../interactions/buttons/index.js');
const { modalList } = require('../interactions/modals/index.js');
const { selectMenuList } = require('../interactions/selectmenus/index.js');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (interaction.guild.id != guildId) {
            return interaction.reply({
                content: "Bonjour,\nLe support multi-serveur de portal'bot a été désactivé.\nCela signifie qu'il n'est plus disponible autre part que sur les serveurs Portal.\nBot actuellement diponible sur:\n-Art'Portal - http://discord.gg/graphisme\n\nSi vous recherchez un bot multifonctionnel, le développeur du bot vous conseille Tokinotsuki - https://discord.com/oauth2/authorize?client_id=791437575642152982&permissions=8&scope=bot%20applications.commands"
            });
        }

        
        if (interaction.isChatInputCommand() || interaction.isContextMenuCommand()) {
            const command = client.commands.get(interaction.commandName);
            if (!command) return;
            
            try {
                await command.execute(interaction, client);
            } catch (error) {
                console.error(error);
                try {
                    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
                } catch (error){
                    console.error(error);
                }
            }
        } else if (interaction.isButton()) {
            buttonList[interaction.customId.split("_")[0]] ? buttonList[interaction.customId.split("_")[0]].execute(interaction, client) : interaction.reply({ content: "Si vous rencontrez cette erreur, merci de contacter CoolMan#4094 !", ephemeral: true });
        } else if (interaction.isStringSelectMenu()) {
            selectMenuList[interaction.customId.split("_")[0]].execute(interaction, client);
        } else if (interaction.isModalSubmit()) {
            modalList[interaction.customId.split("_")[0]] ? modalList[interaction.customId.split("_")[0]].execute(interaction, client) : interaction.reply({ content: "Si vous rencontrez cette erreur, merci de contacter CoolMan#4094 !", ephemeral: true });
        } else {
            console.log(interaction)
        }
    }
}