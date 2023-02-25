const { ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js')

module.exports = {
    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });
        const ticketgraphismtyperow2 = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId(`ticket_create-graphism-${interaction.customId.replace('ticketopener_', '')}`)
                    .setPlaceholder('Choisissez le type de graphisme.')
                    .addOptions([
                        {
                            label: 'Logo/Logo',
                            value: 'ticket_logo',
                            emoji: '🖼'
                        },
                        {
                            label: 'Bannière/Banner (Discord)',
                            value: 'ticket_discordbanner',
                            emoji: '🧩'
                        },
                        {
                            label: 'Bannière/Banner (Youtube/Twitch)',
                            value: 'ticket_ytbbanner',
                            emoji: '🧩'
                        },
                        {
                            label: 'Dessin/Drawing',
                            value: 'ticket_drawing',
                            emoji: '✏'
                        },
                        {
                            label: 'Photo de profil/Profile picture',
                            value: 'ticket_profilepicture',
                            emoji: '🎆'
                        },
                        {
                            label: 'Overlay/Overlay',
                            value: 'ticket_overlay',
                            emoji: '🎥'
                        },
                        {
                            label: 'Emojis/Emotes',
                            value: 'ticket_emojis',
                            emoji: '😀'
                        },
                        {
                            label: 'Miniature/Thumbnail',
                            value: 'ticket_minia',
                            emoji: '🪟'
                        },
                        {
                            label: 'Autre/Other',
                            value: 'ticket_other',
                            emoji: '🎈'
                        }
                    ]),
            );
        await interaction.editReply({ components: [ticketgraphismtyperow2] })
    }
}