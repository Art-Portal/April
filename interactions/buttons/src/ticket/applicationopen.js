const { PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, ChannelType } = require('discord.js');

module.exports = {
    async execute(interaction, client){
        interaction.deferReply({ ephemeral: true });
        const embedToSend = interaction.message.embeds[0];
        const userId = interaction.customId.replace("applicationopen_","");
        const member = client.users.cache.find(user => user.id === userId)

        await interaction.guild.channels.create({
            name: `candidature-${member.username}`,
            type: ChannelType.GuildText,
            parent: '916721453121040424',
            permissionOverwrites: [
	    		{
                	id: userId,
               		allow: [PermissionFlagsBits.ViewChannel],
           		},
                {
                    id: interaction.guild.id,
                    deny: [PermissionFlagsBits.ViewChannel],
                },
                {
                    id: '778016554066640896',
                    allow: [PermissionFlagsBits.ViewChannel],
                },

           	],
            reason: `April - Tickets candidatures - ${interaction.user.id}'`,
            topic: `Candidature de <@${userId}>\nID: ${userId}\nDate de la candidature: <t:${Math.floor(Date.now() / 1000)}:f>`
        }).then(async channel => {
            const btnrowTicket = new ActionRowBuilder()
                .addComponents([
                    new ButtonBuilder()
                    .setLabel("Fermer le ticket")
                    .setStyle(ButtonStyle.Danger)
                    .setEmoji("🔒")
                    .setCustomId(`ticket_close-${userId}`),
                ]);

            const commandEmbed = new EmbedBuilder()
                .setColor(`#7961fd`)
                .setTitle("Candidature")
                .setDescription("Veuillez patienter, un membre du staff consultera votre candidature sous peu !\n> En cas de candidature troll, non sérieuse, etc, vous pouvez être sujet à des sanctions !");

            await channel.send({ content: "Bienvenue <@" + userId + "> ! Ce salon est là pour discuter de ta candidature !", embeds: [commandEmbed], components: [btnrowTicket] }).then(msg => msg.pin());

            const openedapplicationticket = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId("applicationopened")
                    .setLabel("Ticket ouvert")
                    .setStyle(ButtonStyle.Primary)
                    .setDisabled(true)
                    .setEmoji("🎫"),
                );

			await channel.send({embeds:[embedToSend]}).then(msg => msg.pin());
            await interaction.followUp({ content: `Candidature ouverte dans <#${channel.id}>`, ephemeral: true });
            await interaction.message.edit( { content: `Candidature ouverte dans <#${channel.id}>`, components: [openedapplicationticket] } )
        }).catch(console.error);
    }
}