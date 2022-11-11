const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('clear')
		.setDefaultMemberPermissions(0x2)
		.addIntegerOption(
			option =>
				option
					.setName('nombre')
					.setDescription('Quantité de messages à supprimer')
					.setMinValue(1)
                    .setMaxValue(100)
					.setRequired(true)
		)
		.setDescription('Supprimer un grand nombre de messages d\'un salon'),
	async execute(interaction, client) {
        const number = interaction.options.getInteger('nombre');
        await interaction.channel.bulkDelete(number);
		await interaction.reply({ content: `J'ai bien supprimé ${number} message${number>1 ? "s" : ""} dans ce salon`, ephemeral: true});   
    }
};