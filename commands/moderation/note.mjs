import { EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import config from '../../config.json' assert { type: 'json' };
const { sanctionChannelId } = config;

export default {
	data: new SlashCommandBuilder()
        .setName('note')
        .setDescription('Ajouter une note sur un membre !')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .addUserOption(
	    option =>
                option
		    .setName('user')
		    .setDescription('Membre à noter / id si le membre n\'est pas sur le serveur')
		    .setRequired(true)
	)
        .addStringOption(
            option =>
                option
                    .setName('reason')
                    .setDescription('Contenu de la note')
                    .setRequired(true)),

    async execute(interaction, client) {
        const user = interaction.options.getUser('user');
        const member = interaction.options.getMember('user');
        const reason = interaction.options.getString('reason');
        if (member){
            const userRoleRawPos = member.roles.highest.rawPosition;
            const memberRoleRawPos = interaction.member.roles.highest.rawPosition;
            if (user.id === interaction.user.id) return interaction.reply({content: `Vous ne pouvez pas vous noter vous-même! !`, ephemeral: true});
            if (userRoleRawPos >= memberRoleRawPos) return interaction.reply({content: `Vous ne pouvez pas noter cet utilisateur.`, ephemeral: true});
        }

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
                    name: "・Raison de la note",
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
                type: "Note",
                reason: reason,
                timestamp: Math.floor(new Date().getTime()/1000),
                moderatorid: interaction.member.user.id
            })

    }
};
