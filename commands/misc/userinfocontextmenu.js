const { ContextMenuCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
	data: new ContextMenuCommandBuilder()
		.setName('UserInfo')
		.setType(2),
		
	async execute(interaction, client) {
		const user = interaction.targetUser;
		const member = interaction.targetMember;

		const embedUSERINFO = new EmbedBuilder()
		if (user) {
			embedUSERINFO
				.setAuthor({
					name: user.tag,
					iconURL: user.avatarURL()
				})
				.setColor("Blurple")
				.setThumbnail(user.avatarURL())
				.setDescription(`<@${user.id}>`)
				.addFields([
					{
						name: "👤 Informations sur le compte",
						value: ``
							+ `<:invisibleSpacer:1038116840360120360><:iconID:1038063974807261195> **ID:** ${user.id}\n`
							+ `<:invisibleSpacer:1038116840360120360><:iconProfile:1038064029064773724> **Nom complet:** ${user.tag}\n`
							+ `<:invisibleSpacer:1038116840360120360><:iconTimer:1038063915151654932> **Créé:** <t:${Math.floor(user.createdTimestamp / 1000)}:d>`
						,
						inline: false
					}
				]);

			if (member) {
				embedUSERINFO.addFields([
					{
						name: "📋 Information sur le membre",
						value:
							`<:invisibleSpacer:1038116840360120360><:iconTimer:1038063915151654932> **A rejoint le serveur:** <t:${member.user.id == "697438073646088194" ? "1604430645" : Math.floor(member.joinedTimestamp / 1000)}:R>\n`
							+ `<:invisibleSpacer:1038116840360120360><:iconProfile:1038064029064773724> **Nickname:** ${member.nickname || `Aucun`}\n`
							+ `<:invisibleSpacer:1038116840360120360><:IconAnnouncement:1038063917026508881> **Plus haut rôle:** ${member.roles.hoist ? member.roles.hoist.name : "Aucun"}`
						,
						inline: false
					},
					{
						name: `📝 Rôles [${member.roles.cache.size - 1}]`,
						value: member.roles.cache.size ? member.roles.cache.map(roles => `**${roles}**`).slice(0, 20).join(" ") : "None",
						inline: false
					}])
			}
		} else {
			embedUSERINFO.setDescription("Utilisateur inconnu")
		}

		await interaction.reply({
			embeds: [embedUSERINFO],
			ephemeral: false
		});
	}
}
