const { PermissionFlagsBits, ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
    async execute(interaction, client) {
        await interaction.deferUpdate({ ephemeral: true });
        switch (interaction.customId.replace("ticket_","").split("-")[0]) {
            case 'close':
                await interaction.channel.permissionOverwrites.set([
                    {
                        id: interaction.guild.id,
                        deny: [PermissionFlagsBits.ViewChannel],
                    },
                    {
                        id: '778016554066640896',
                        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ManageChannels],
                    },
                ]);
                const closebuttons = new ActionRowBuilder()
                .addComponents([
                    new ButtonBuilder()
                        .setCustomId(`ticket_reopen-${interaction.customId.replace("ticket_","").split("-")[1]}`)
                        .setEmoji('🔐')
                        .setLabel("Rouvrir le ticket")
                        .setStyle(ButtonStyle.Success),
                    new ButtonBuilder()
                        .setCustomId(`ticket_delete`)
                        .setEmoji('🗑️')
                        .setLabel("Supprimer le ticket")
                        .setStyle(ButtonStyle.Danger),
                ]);

                const closeEmbed = new EmbedBuilder()
                    .setTitle('Art\'Portal - Tickets')
                    .setDescription(`Le ticket a été fermé par <@${interaction.user.id}>`)
                    .setColor('#ce0808');
                
                await interaction.editReply({ components: [closebuttons] });
                await interaction.followUp({ embeds: [closeEmbed] });
                break;

            case 'delete':
                if (!interaction.member.roles.cache.has('778016554066640896')) return interaction.reply({ content: "Tu n'a pas la permission de faire ça!", ephemeral: true });

                var ticketRowDelete = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setLabel("Oui")
                            .setStyle(ButtonStyle.Success)
                            .setEmoji("✔")
                            .setCustomId("ticket_confirmDelete"),
                        new ButtonBuilder()
                            .setLabel("Non")
                            .setStyle(ButtonStyle.Danger)
                            .setEmoji("❌")
                            .setCustomId("ticket_cancelDelete"),
                    );
                interaction.editReply({});
                interaction.followUp({ content: "Êtes-vous sûr de vouloir supprimer ce ticket ?", components: [ticketRowDelete] })
                break;

            case 'confirmDelete':
                if (!interaction.member.roles.cache.has('778016554066640896')) return interaction.reply({ content: "Tu n'a pas la permission de faire ça!", ephemeral: true });
                await interaction.editReply({ content: "Le ticket va être supprimé dans 5 secondes !", components: [] })
                setTimeout(() => {
                    interaction.guild.channels.delete(interaction.channel.id, `Ticket supprimé par ${interaction.user.tag} (${interaction.user.id})`)
                }, 5000)
                break;

            case 'cancelDelete':
                if (!interaction.member.roles.cache.has('778016554066640896')) return interaction.reply({ content: "Tu n'a pas la permission de faire ça!", ephemeral: true });
                await interaction.editReply({ content: "Annulation de la suppression !", components: [] })
                setTimeout(() => {
                    interaction.message.delete();
                }, 5000)
                break;
            
            

            case 'reopen':
                await interaction.channel.permissionOverwrites.set([
                    {
                        id: interaction.guild.id,
                        deny: [PermissionFlagsBits.ViewChannel],
                    },
                    {
                        id: interaction.customId.replace("ticket_","").split("-")[1],
                        allow: [PermissionFlagsBits.ViewChannel],
                    },
                    {
                        id: '778016554066640896',
                        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ManageChannels],
                    },
                ]);
                if (['1040706105321467934', '780559502105378836'].includes(interaction.channel.parentId)){
                    await interaction.channel.permissionOverwrites.create('780007193688801321', {
                        ViewChannel: true
                    });
                    await interaction.channel.permissionOverwrites.create('778016552108556388', {
                        ViewChannel: true
                    });
                }

                const btnrowTicket = new ActionRowBuilder()

                if (interaction.channel.parentId == '780559502105378836') btnrowTicket.addComponents(
                    new ButtonBuilder()
                        .setLabel("Prendre en charge")
                        .setStyle(ButtonStyle.Success)
                        .setEmoji("✏")
                        .setCustomId(`ticket_takeCommand-${interaction.customId.replace("ticket_","").split("-")[1]}`),
                    )
                
                btnrowTicket.addComponents([
                    new ButtonBuilder()
                        .setLabel("Fermer le ticket")
                        .setStyle(ButtonStyle.Danger)
                        .setEmoji("🔒")
                        .setCustomId(`ticket_close-${interaction.customId.replace("ticket_","").split("-")[1]}`),
                ]);

                const reopenEmbed = new EmbedBuilder()
                    .setTitle('Art\'Portal - Tickets')
                    .setDescription(`Le ticket a été rouvert par <@${interaction.user.id}>`)
                    .setColor("#34f213");
                
                await interaction.editReply({ components: [btnrowTicket] });
                await interaction.followUp({ embeds: [reopenEmbed] });
                break;

            case 'takeCommand':
                const ticketRowTaken = new ActionRowBuilder()
                    .addComponents([
                        new ButtonBuilder()
                            .setLabel("Annuler la prise en charge")
                            .setStyle(ButtonStyle.Danger)
                            .setEmoji("❌")
                            .setCustomId(`ticket_cancelTakenCommand-${interaction.user.id}-${interaction.customId.replace("ticket_","").split("-")[1]}`),
                        new ButtonBuilder()
                            .setLabel("Fermer le ticket")
                            .setStyle(ButtonStyle.Danger)
                            .setEmoji("🔒")
                            .setCustomId(`ticket_close-${interaction.customId.replace("ticket_","").split("-")[1]}`),
                    ]);
                const artist = await client.database.artists.findOne({ where: { name: interaction.user.id } });
                interaction.channel.setName((artist ? artist.emoji :"🟢")+interaction.channel.name);
                await interaction.followUp({ embeds: [
                    new EmbedBuilder()
                    .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.avatarURL() })
                    .setDescription(`<@${interaction.user.id}> prend en charge le ticket !\nMerci à elle/lui !`)
                    .setColor('#34f213')
                ] });
                await interaction.editReply({ components: [ticketRowTaken] });
                break;
                
            case 'cancelTakenCommand':
                let untakeMessage;
                if (interaction.user.id == interaction.customId.replace("ticket_","").split("-")[1]) untakeMessage = "(Annulation par l'artiste)"
                else if (interaction.member.permissions.has(PermissionFlagsBits.Administrator)) untakeMessage = "(Annulation par le staff)"
                else{
                    await interaction.editReply();
                    return interaction.followUp({ content: `Vous n'avez pas la permission de faire ça !`, ephemeral: true });
                }
                const ticketRowUntaken = new ActionRowBuilder()
                    .addComponents([
                        new ButtonBuilder()
                            .setLabel("Prendre en charge")
                            .setStyle(ButtonStyle.Success)
                            .setEmoji("✏")
                            .setCustomId(`ticket_takeCommand-${interaction.customId.replace("ticket_","").split("-")[2]}`),
                        new ButtonBuilder()
                            .setLabel("Fermer le ticket")
                            .setStyle(ButtonStyle.Danger)
                            .setEmoji("🔒")
                            .setCustomId(`ticket_close-${interaction.customId.replace("ticket_","").split("-")[2]}`),
                    ]);
                const artistUntake = await client.database.artists.findOne({ where: { name: interaction.user.id } });
                interaction.channel.setName(interaction.channel.name.replace(artistUntake ? artistUntake.emoji :"🟢",""));
                await interaction.followUp({ embeds: [
                    new EmbedBuilder()
                    .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.avatarURL() })
                    .setDescription(`<@${interaction.customId.replace("ticket_","").split("-")[1]}> ne prend plus en charge le ticket ! ${untakeMessage}`)
                    .setColor('#ce0808')
                ] });
                await interaction.editReply({ components: [ticketRowUntaken] });
                break;
        }
    }
}