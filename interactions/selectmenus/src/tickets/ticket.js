const { ActionRowBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle, PermissionFlagsBits, ChannelType } = require("discord.js");

module.exports = {
    async execute(interaction) {
        switch (interaction.customId.split('-')[1]) {
            case "graphism":
                const commandType = cmdTypeDict[interaction.values[0].replace("ticket_", "")];
                const remuneration = interaction.customId.split('-')[2];
                const commandmodal = new ModalBuilder()
                    .setCustomId("command_" + interaction.values[0].replace("ticket_", ""))
                    .setTitle("Art'Portal - Commande - " + commandType)
                    .addComponents([
                        new ActionRowBuilder()
                            .addComponents([
                                new TextInputBuilder()
                                    .setCustomId("command_theme")
                                    .setLabel("Thème")
                                    .setStyle(TextInputStyle.Short)
                                    .setMinLength(10)
                                    .setMaxLength(1000)
                                    .setPlaceholder("(Exemple: Futuriste, Fantaisie, Naturel, Etc...)")
                                    .setRequired(true),
                            ]),
                        new ActionRowBuilder()
                            .addComponents([
                                new TextInputBuilder()
                                    .setCustomId("command_description")
                                    .setLabel("Description")
                                    .setStyle(TextInputStyle.Paragraph)
                                    .setMinLength(150)
                                    .setMaxLength(1000)
                                    .setPlaceholder("(Décrivez votre demande afin de faciliter le travail du graphiste. Soyez le plus précis possible!)")
                                    .setRequired(true),
                            ]),
                        new ActionRowBuilder()
                            .addComponents([
                                new TextInputBuilder()
                                    .setCustomId("command_toppings")
                                    .setLabel("Effets/Détails/Texte à ajouter")
                                    .setStyle(TextInputStyle.Paragraph)
                                    .setMaxLength(1000)
                                    .setPlaceholder("(Écrivez votre texte sans oublier les majuscules, minuscules, accent, etc...)")
                                    .setRequired(false),
                            ]),
                        new ActionRowBuilder()
                            .addComponents([
                                new TextInputBuilder()
                                    .setCustomId("command_baseimage")
                                    .setLabel("Image(s) de Base, Exemples (mettez des liens)")
                                    .setStyle(TextInputStyle.Paragraph)
                                    .setMaxLength(1000)
                                    .setPlaceholder("Proposer des exemples aidera beaucoup les artistes à comprendre ce que vous voulez")
                                    .setRequired(false),
                            ])
                    ]);
                if(remuneration=='paid'){
                    commandmodal.addComponents([
                        new ActionRowBuilder()
                            .addComponents([
                                new TextInputBuilder()
                                    .setCustomId("command_remuneration")
                                    .setLabel("Votre budget")
                                    .setStyle(TextInputStyle.Short)
                                    .setMinLength(1)
                                    .setMaxLength(30)
                                    .setPlaceholder("Indiquez le budget que vous avez pour la rémunération de cette commande")
                                    .setRequired(true),
                            ])
                        ])
                }
                await interaction.showModal(commandmodal);
                break;

            case "support":
                switch (interaction.values[0].replace("_option", "")) {
                    case "partnership":
                        const partnershipmodal = new ModalBuilder()
                        .setCustomId("partnershipmodal")
                        .setTitle("Art'Portal - Partenariats")
                        .addComponents([
                            new ActionRowBuilder()
                                .addComponents([
                                    new TextInputBuilder()
                                        .setCustomId("partnership_servinvite")
                                        .setLabel("Invitation / Lien")
                                        .setStyle(TextInputStyle.Short)
                                        .setMaxLength(35)
                                        .setPlaceholder("Invitation / Lien de votre organisme")
                                        .setRequired(true),
                            ]),
                            new ActionRowBuilder()
                                .addComponents([
                                    new TextInputBuilder()
                                        .setCustomId("partnership_servdesc")
                                        .setLabel("Description")
                                        .setStyle(TextInputStyle.Paragraph)
                                        .setMinLength(10)
                                        .setMaxLength(1000)
                                        .setPlaceholder("Décrivez votre serveur / organisation si ce n'est pas un serveur")
                                        .setRequired(false)
                                ]),
                        ])
                        interaction.showModal(partnershipmodal);
                        break;
                    
                    case "contact":
                        await interaction.guild.channels.create({
                            name: `ticket-${interaction.user.username}`,
                            type: ChannelType.GuildText,
                            permissionOverwrites: [
                                {
                                    id: interaction.user.id,
                                    allow: [PermissionFlagsBits.ViewChannel],
                                },
                            ],
                            reason: "April - Tickets - Contact du staff"
                        }).then(async channel => {
                            let category = interaction.guild.channels.cache.find(cat => cat.id === "916721453121040424");

                            await channel.setParent(category.id);
                            await channel.permissionOverwrites.create(interaction.user, { ViewChannel: true });

                            var btnrowTicket = new ActionRowBuilder()
                                .addComponents([
                                    new ButtonBuilder()
                                        .setLabel("Fermer le ticket")
                                        .setStyle(ButtonStyle.Danger)
                                        .setEmoji("🔒")
                                        .setCustomId(`ticket_close-${interaction.user.id}`),
                                ]);

                            const commandEmbed = new EmbedBuilder()
                                .setColor(`#7961fd`)
                                .setDescription("*Merci de patienter un peu*");

                            await channel.send({ content: "Bienvenue <@" + interaction.user.id + ">\n<@&778016554066640896> un ticket a été ouvert!", embeds: [commandEmbed], components: [btnrowTicket] }).then(msg => msg.pin())
                            await interaction.reply({ content: "Ton ticket a bien été créé ! (<#" + channel.id + ">)", ephemeral: true })
                        }).catch(console.error);
                        break;

                    case "report":
                        const reportmodal = new ModalBuilder()
                            .setCustomId('reportmodal')
                            .setTitle('Art\'Portal - Report')
                            .addComponents(
                                new ActionRowBuilder()
                                    .addComponents([
                                        new TextInputBuilder()
                                            .setCustomId('reason')
                                            .setLabel('Raison du report')
                                            .setStyle(TextInputStyle.Paragraph)
                                            .setMinLength(10)
                                            .setMaxLength(1000)
                                            .setPlaceholder(`Merci d'indiquer également le pseudo de la personne !`)
                                            .setRequired(true),
                                    ]),
                                new ActionRowBuilder()
                                    .addComponents([
                                        new TextInputBuilder()
                                            .setCustomId('messageslink')
                                            .setLabel('Liens vers les messages (facultatif)')
                                            .setStyle(TextInputStyle.Paragraph)
                                            .setMinLength(10)
                                            .setMaxLength(1000)
                                            .setPlaceholder(`Vous pouvez mettre des liens de messages problématiques. (facultatif mais peut aider)`)
                                            .setRequired(false),
                                    ]),
                                new ActionRowBuilder()
                                    .addComponents([
                                        new TextInputBuilder()
                                            .setCustomId('screens')
                                            .setLabel('Captures d\'écran (facultatives)')
                                            .setStyle(TextInputStyle.Paragraph)
                                            .setMinLength(10)
                                            .setMaxLength(1000)
                                            .setPlaceholder(`Vous pouvez mettre des liens vers des captures d'écran.`)
                                            .setRequired(false),
                                    ]),
                            );
                        interaction.showModal(reportmodal);
                        break;
            }
            break;
        }
    },
};

const cmdTypeDict = {
    "logo": "Logo",
    "discordbanner": "Bannière Discord",
    "ytbbanner": "Bannière Youtube/...",
    "drawing": "Dessin",
    "profilepicture": "Photo de profil",
    "video": "Video/Montage",
    "overlay": "Overlay de stream",
    "emojis": "Émojis/Stickers",
    "minia": "Miniature",
    "other": "Autre",
};
