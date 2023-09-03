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
		await interaction.deferReply({ ephemeral: true })
		const number = interaction.options.getInteger('nombre');
		try {
			const fetched = await interaction.channel.messages.fetch({ limit: number });
			const notPinned = fetched.filter(fetchedMsg => !fetchedMsg.pinned);

			await interaction.channel.bulkDelete(notPinned, true);
			await interaction.editReply({ content: `J'ai bien supprimé ${notPinned.size} message${notPinned.size>1 ? "s" : ""} dans ce salon`, ephemeral: true});   
		} catch(err) {
			console.error(err);
		}
    }
};
