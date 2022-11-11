const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { sanctionChannelId } = require('../../config.json');

module.exports = {
	data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Expulser un utilisateur !')
        .setDefaultMemberPermissions(0x2)
        .addUserOption(
			option =>
				option
					.setName('user')
					.setDescription('Membre à kick')
					.setRequired(true))
        .addStringOption(
			option =>
				option
					.setName('reason')
					.setDescription('Raison de l\'expulsion')
					.setRequired(true)),

    async execute(interaction, client) {
        // if(!interaction.member.permissions.has(0x4)) return interaction.reply({content: `Vous n'avez pas la permisssion \`BAN_MEMBERS\` pour effectuer cette commande.`, ephemeral: true});

        const user = interaction.options.getUser('user');
		const member = interaction.options.getMember('user');
        const reason = interaction.options.getString('reason');

		if (member){
			const userRoleRawPos = member.roles.highest.rawPosition;
			const memberRoleRawPos = interaction.member.roles.highest.rawPosition;
			if(user.id === interaction.user.id) return interaction.reply({content: `Vous ne pouvez pas vous expulser vous-même vous-même!`, ephemeral: true});
			if(userRoleRawPos >= memberRoleRawPos) return interaction.reply({content: `Vous ne pouvez pas expulser cet utilisateur.`, ephemeral: true});
			if(!member.bannable) return interaction.reply({content: `Je ne peux pas expulser cet utilisateur. Cela est dû au fait que l'utilisateur est modérateur/administrateur ou que son rôle est au dessus du rôle du bot...`, ephemeral: true});
		} else return interaction.reply({ content: "Le membre sélectionné n'est pas présent sur le serveur !", ephemeral: true });
		await member.kick( {reason: reason + " - Expulsé.e par " + interaction.member.user.tag} );

		const kickEMBED = new EmbedBuilder()
		.setColor(`#009500`)
		.setThumbnail(`https://i.imgur.com/zcZsfNA.png`)
		.setTitle(`➔ Art' Portal - Expulsion`)
		.addFields(
			{ 
				name: "・Utilisateur.trice・",
				value: `**Tag: ${user.tag}\nID: ${user.id}**`,
				inline: true
			},
			{ 
				name: "・Raison de l'expulsion",
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
		await interaction.reply({embeds: [kickEMBED], ephemeral: true});
		const channel = await interaction.guild.channels.cache.get(sanctionChannelId);
		await channel.send({
			embeds: [kickEMBED]
		});
		await client.database.modlog.create({
        	name: user.id,
			username: user.tag,
			type: "Kick",
			reason: reason,
			timestamp: Math.floor(new Date().getTime()/1000),
			moderatorid: interaction.member.user.id
		})
    }
};