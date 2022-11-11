const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    async execute(interaction, client) {
        await interaction.deferReply({ ephemeral: true });
        const channel = interaction.options.getChannel('channel');

        switch(interaction.options.getString('type')){
            case 'blacklist':
                await channel.send({
                    embeds: [
                        new EmbedBuilder()
                            .setAuthor({
                                name: "Art'Portal"
                            })
                            .setTitle("Panel de blacklist")
                            .setDescription("**Utilisez les boutons ci-dessous pour:**\n> ❌ - Ajouter un utilisateur à la blacklist\n> ✅ - Retirer un utilisateur de la blacklist\n> 🖨 - Afficher les informations de blacklist d'un utilisateur")
                            .setColor(`#7961fd`)
                    ],
                    components: [
                        new ActionRowBuilder()
                            .addComponents([
                                new ButtonBuilder()
                                    .setCustomId("blacklist_add")
                                    .setStyle(ButtonStyle.Danger)
                                    .setEmoji("✖️"),
                                new ButtonBuilder()
                                    .setCustomId("blacklist_remove")
                                    .setStyle(ButtonStyle.Success)
                                    .setEmoji("✅"),
                                new ButtonBuilder()
                                    .setCustomId("blacklist_check")
                                    .setStyle(ButtonStyle.Secondary)
                                    .setEmoji("🖨")
                            ])
                        ]
                    })
                await interaction.editReply({
                    content: "Le panel de blacklist a bien été envoyé !",
                    ephemeral: true
                });
                break;
            case 'sanctions':
                await channel.send({
                    embeds: [
                        new EmbedBuilder()
                            .setAuthor({
                                name: "Art'Portal"
                            })
                            .setTitle("Panel de moderation")
                            .setDescription("Panel de modération destiné au staff !\nUtilisez les boutons ci-dessous pour appliquer diverses sanctions !")
                            .setColor(`#7961fd`)
                    ],
                    components: [
                        new ActionRowBuilder()
                        .addComponents([
                            new ButtonBuilder()
                                .setCustomId("modpanel_ban")
                                .setLabel("Ban")
                                .setStyle(ButtonStyle.Danger)
                                .setEmoji("🔨"),
                            new ButtonBuilder()
                                .setCustomId("modpanel_kick")
                                .setLabel("Kick")
                                .setStyle(ButtonStyle.Danger)
                                .setEmoji("🦶"),
                            new ButtonBuilder()
                                .setCustomId("modpanel_timeout")
                                .setLabel("Mute")
                                .setStyle(ButtonStyle.Danger)
                                .setEmoji("🤫"),
                            new ButtonBuilder()
                                .setCustomId("modpanel_warn")
                                .setLabel("Warn")
                                .setStyle(ButtonStyle.Danger)
                                .setEmoji("⚠️"),
                            new ButtonBuilder()
                                .setCustomId("modpanel_check")
                                .setLabel("Modlogs")
                                .setStyle(ButtonStyle.Secondary)
                                .setEmoji("🖨"),
                        ])
                    ]
                })
                await interaction.editReply({content: "Le panel de moderation a bien été envoyé !", ephemeral: true});
                break;
        }
    }
};