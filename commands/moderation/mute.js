const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { sanctionChannelId } = require('../../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mute')
		.setDefaultMemberPermissions(0x2)
        .addUserOption(
			option =>
				option
					.setName('user')
					.setDescription('Membre à kick')
					.setRequired(true)
		)
		.addIntegerOption(
			option =>
				option
					.setName('duration')
					.setDescription('Durée du mute en minutes')
					.setMinValue(1)
					.setRequired(true)
		)
		.addStringOption(
			option =>
				option
					.setName('reason')
					.setDescription('Raison du mute')
					.setRequired(true)
		)
		.setDescription('Rendre un membre muet'),
	async execute(interaction, client) {
        const duration = interaction.options.getInteger('duration');
		const member = interaction.options.getMember('user');
		const reason = interaction.options.getString('reason');
		if (member){
			const userRoleRawPos = member.roles.highest.rawPosition;
			const memberRoleRawPos = interaction.member.roles.highest.rawPosition;
			if(member.user.id === interaction.user.id) return interaction.reply({content: `Vous ne pouvez pas vous mute vous-même vous-même! !`, ephemeral: true});
			if(userRoleRawPos >= memberRoleRawPos) return interaction.reply({content: `Vous ne pouvez pas mute cet utilisateur.`, ephemeral: true});
			if(!member.bannable) return interaction.reply({content: `Je ne peux pas mute cet utilisateur. Cela est dû au fait que l'utilisateur est modérateur/administrateur ou que son rôle est au dessus du rôle du bot...`, ephemeral: true});
		} else return interaction.reply({ content: "Le membre sélectionné n'est pas présent sur le serveur !", ephemeral: true });
		await member.timeout(duration * 60 * 1000, {reason: reason + " - Mute par " + interaction.member.user.tag} );

		const muteEMBED = new EmbedBuilder()
		.setColor(`#009500`)
		.setThumbnail(`https://i.imgur.com/zcZsfNA.png`)
		.setTitle(`➔ Art' Portal - Mute`)
		.addFields(
			{
				name: "・Utilisateur.trice・",
				value: `**Tag: ${member.user.tag}\nID: ${member.user.id}**`,
				inline: true
			},
			{ 
				name: "・Raison du mute",
				value: `**${reason !== null ? `${reason}` : 'No reason specified'}**`,
				inline: true
			},
			{
				name: `・Modérateur.trice・`,
				value: `**${interaction.member.user.tag}**`
			},
			{
				name: `・Date・`,
				value: `<t:${Math.floor(new Date().getTime()/1000)}:D>`,
				inline: true
			},
		);
		await interaction.reply({embeds: [muteEMBED], ephemeral: true});
		const channel = await interaction.guild.channels.cache.get(sanctionChannelId);
		await channel.send({
			embeds: [muteEMBED]
		});
		await client.database.modlog.create({
        	name: member.user.id,
			username: member.user.tag,
			type: "Mute",
			reason: reason,
			timestamp: Math.floor(new Date().getTime()/1000),
			moderatorid: interaction.member.user.id
		})
    }
};