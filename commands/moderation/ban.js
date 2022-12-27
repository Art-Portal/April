const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { sanctionChannelId } = require('../../config.json');

module.exports = {
	data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Bannir un utilisateur !')
        .setDefaultMemberPermissions(0x4)
        .addUserOption(
	    option =>
                option
		    .setName('user')
		    .setDescription('Membre à bannir / id si le membre n\'est pas sur le serveur')
		    .setRequired(true)
	)
        .addStringOption(
            option =>
                option
                    .setName('reason')
                    .setDescription('Raison du bannissement')
                    .setRequired(true)),

    async execute(interaction, client) {
        const user = interaction.options.getUser('user');
        const member = interaction.options.getMember('user');
        const reason = interaction.options.getString('reason');
        if (member){
            const userRoleRawPos = member.roles.highest.rawPosition;
            const memberRoleRawPos = interaction.member.roles.highest.rawPosition;
            if (user.id === interaction.user.id) return interaction.reply({content: `Vous ne pouvez pas vous bannir vous-même! !`, ephemeral: true});
            if (userRoleRawPos >= memberRoleRawPos) return interaction.reply({content: `Vous ne pouvez pas bannir cet utilisateur.`, ephemeral: true});
            if (!member.bannable) return interaction.reply({content: `Je ne peux pas bannir cet utilisateur. Cela est dû au fait que l'utilisateur est modérateur/administrateur ou que son rôle est au dessus du rôle du bot...`, ephemeral: true});
        }

        await interaction.guild.bans.create(user.id, {reason: reason + " - Banni.e par " + interaction.member.user.tag});

        const banEMBED = new EmbedBuilder()
            .setColor(`#009500`)
            .setThumbnail(`https://i.imgur.com/zcZsfNA.png`)
            .setTitle(`➔ Art' Portal - Bannissement`)
            .addFields(
                { 
                    name: "・Utilisateur.trice・",
                    value: `**Tag: ${user.tag}\nID: ${user.id}**`,
                    inline: true
                },
                { 
                    name: "・Raison du bannissement・",
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
            await interaction.reply({embeds: [banEMBED], ephemeral: true});
            const channel = await interaction.guild.channels.cache.get(sanctionChannelId);
            await channel.send({
                embeds: [banEMBED]
            });
            await client.database.modlog.create({
                name: user.id,
                username: user.tag,
                type: "Ban",
                reason: reason,
                timestamp: Math.floor(new Date().getTime()/1000),
                moderatorid: interaction.member.user.id
            })

    }
};
