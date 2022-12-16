const { SlashCommandBuilder } = require('discord.js');
const { devId } = require('../../config.json');
const { deploy_commands } = require('../../functions.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reload')
        .setDefaultMemberPermissions(0x8)
        .setDescription('Recharge les commandes du bot (dev only).'),
    async execute(interaction, client) {
        if (!interaction.user.id == devId) return void interaction.reply({ content: "Permission denied" });
        deploy_commands(client, false);
    }
};
