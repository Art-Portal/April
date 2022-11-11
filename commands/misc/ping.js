const { SlashCommandBuilder, ActionRowBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Obtenir la latence du bot.'),

	async execute(interaction, client) {
		const pingRefreshButton = new ButtonBuilder()
			.setCustomId('pingrefreshbtn')
			.setEmoji("🔁")
            .setStyle(ButtonStyle.Primary)
		
		const row = new ActionRowBuilder()
			.addComponents([
				pingRefreshButton
			])

		const sent = await interaction.reply({
			content: 'Pinging...',
			components:[row],
			fetchReply: true
		});

		const latency = new EmbedBuilder()
			.setColor(`#7961fd`)
			.setTitle(`🏓 Pong ! Aprıl v4.0.0\n`)
			.setDescription(
				"\n"
				+ `**Latence :** ${sent.createdTimestamp - interaction.createdTimestamp}ms\n`
				+ `**API :** ${Math.round(client.ws.ping)}ms`
			)

		interaction.editReply({
			content:" ",
			embeds:[latency]
		});
	},
};
