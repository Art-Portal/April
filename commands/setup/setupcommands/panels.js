const { ButtonStyle, EmbedBuilder, StringSelectMenuBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js')

module.exports = {
    async execute(interaction, client) {
        await interaction.deferReply({
            ephemeral: true
        });
        const channel = interaction.options.getChannel('channel');
        switch (interaction.options.getString('type')) {
            case 'rolereact':
                const rolereactEMBED = new EmbedBuilder()
                    .setAuthor({
                        name: "Art'Portal"
                    })
                    .setTitle("Choisissez vos rôles/Choose your roles")
                    .setDescription("Cliquez sur les boutons pour choisir les rôles correspondant à vos choix\nClick on the buttons in order to choose the roles you want")
                    .setColor(`#7961fd`);
                await channel.send({
                    embeds: [
                        rolereactEMBED
                    ],
                    components: [
                        new ActionRowBuilder()
                            .addComponents([
                                new ButtonBuilder()
                                    .setCustomId("getrole_genre")
                                    .setLabel("Pronoms/Pronouns")
                                    .setStyle(ButtonStyle.Primary)
                                    .setEmoji("👥"),
                                new ButtonBuilder()
                                    .setCustomId("getrole_hobbies")
                                    .setLabel("Hobbies/Hobbies")
                                    .setStyle(ButtonStyle.Primary)
                                    .setEmoji("♟️"),
                                new ButtonBuilder()
                                    .setCustomId("getrole_color")
                                    .setLabel("Couleur/Color")
                                    .setStyle(ButtonStyle.Primary)
                                    .setEmoji("🌈"),
                                new ButtonBuilder()
                                    .setCustomId("getrole_pings")
                                    .setLabel("Notifications/Pings")
                                    .setStyle(ButtonStyle.Primary)
                                    .setEmoji("📌")
                            ]),
                        new ActionRowBuilder()
                            .addComponents([
                                new ButtonBuilder()
                                    .setCustomId("getrole_list")
                                    .setLabel("Afficher vos rôles")
                                    .setStyle(ButtonStyle.Secondary)
                                    .setEmoji("📖"),
                            ])
                    ]
                });
                await interaction.editReply({
                    content: "Le panel de rolereact a bien été envoyé !",
                    ephemeral: true
                });
                break;

            case 'rolereactembed':
                await channel.send({
                    embeds: [
                        new EmbedBuilder()
                            .setAuthor({
                                name: "Art'Portal"
                            })
                            .setTitle("Présentation des rôles")
                            .setColor(`#7961fd`)
                            .setDescription("Les différents rôles que vous pouvez choisir sur Art'Portal sont listés ci-dessous")
                            .addFields(
                                { 
                                    name: "・Couleurs・",
                                    value: `<@&947490339848060968>\n<@&947490417245556796>\n<@&947490189096415273>\n<@&947490255311872000>\n<@&947496679580500008>\n<@&947485362610139196>\n<@&947489800330559510>`,
                                    inline: true
                                },
                                { 
                                    name: "・Pronoms・",
                                    value: `<@&769918743626252318>\n<@&768393897134784532>\n<@&772041733278007307>`,
                                    inline: true
                                },
                                { 
                                    name: "・Notifications・",
                                    value: `<@&768396461763067914>\n<@&784646468958945280>\n<@&774693756901392404>\n<@&770568527156346880>\n<@&770723703948181525>\n<@&799249307362131978>\n<@&847207140098572318>\n<@&955143137226010704>`,
                                    inline: true
                                },
                                { 
                                    name: "・Hobbies・",
                                    value: `<@&949745563824431124>\n<@&949746089987289128>\n<@&949746175920181278>\n<@&949746259898544229>\n<@&949746341754601502>\n<@&949746559019540511>\n<@&949746641764749324>\n<@&949746678519439370>`,
                                    inline: true
                                },
                            )
                    ]
                })
                await interaction.editReply({
                    content: "L'embed a bien été envoyé !",
                    ephemeral: true
                });
                break;

            case 'candidatures':
                await channel.send({
                    embeds: [ 
                        new EmbedBuilder()
                            .setAuthor({
                                name: "Art'Portal",
                            })
                            .setTitle("Candidatures")
                            .setDescription("Cliquez sur le bouton pour candidater pour entrer dans le staff / l'équipe d' artistes.")
                            .setColor(`#7961fd`)
                    ],
                    components: [
                        new ActionRowBuilder()
                            .addComponents([
                                new ButtonBuilder()
                                    .setCustomId("apply_staff")
                                    .setLabel("Candidature staff")
                                    .setStyle(ButtonStyle.Success)
                                    .setEmoji("🛠"),
                                new ButtonBuilder()
                                    .setCustomId("apply_artist")
                                    .setLabel("Candidature artiste")
                                    .setStyle(ButtonStyle.Success)
                                    .setEmoji("🖌️")
                            ])
                    ]
                })
                await interaction.editReply({
                    content: "Le panel de candidature a bien été envoyé !",
                    ephemeral: true
                });
                break;

            case 'sanctionembed':
                await channel.send({ components: [sanctionembedrow] });
                interaction.editReply({
                    content: "Document des sanctions envoyé !"
                })
                break;

            case 'albumphoto':
                channel.send({ components: [albumphotoembedrow] });
                interaction.editReply({
                    content: "Album photo d'April envoyé !"
                })
                break;
        }
    }
}

const sanctionembedrow = new ActionRowBuilder()
    .addComponents(
        new StringSelectMenuBuilder()
            .setCustomId('document_sanctions')
            .setPlaceholder('Navigateur')
            .addOptions([
                {
                    label: 'Page 1',
                    description: 'Couverture',
                    value: '0',
                },
                {
                    label: 'Page 2',
                    description: 'Notes',
                    value: '1',
                },
                {
                    label: 'Page 3',
                    description: 'Table des matières',
                    value: '2',
                },
                {
                    label: 'Page 4',
                    description: 'Articles 1 & 2',
                    value: '3',
                },
                {
                    label: 'Page 5',
                    description: 'Article 3',
                    value: '4',
                },
                {
                    label: 'Page 6',
                    description: 'Articles 4 & 5',
                    value: '5',
                },
                {
                    label: 'Page 7',
                    description: 'Articles 6 & 7',
                    value: '6',
                },
            ]),
    );
    
const albumphotoembedrow = new ActionRowBuilder()
    .addComponents(
        new StringSelectMenuBuilder()
            .setCustomId('document_albumphoto')
            .setPlaceholder('Navigateur')
            .addOptions([
                {
                    label: 'Page 1',
                    description: 'April - Cool',
                    value: '0',
                },
                {
                    label: 'Page 2',
                    description: 'April - Couteau',
                    value: '1',
                },
                {
                    label: 'Page 3',
                    description: 'April - Dodo',
                    value: '2',
                },
                {
                    label: 'Page 4',
                    description: 'April - Mais',
                    value: '3',
                },
                {
                    label: 'Page 5',
                    description: 'April - Peur',
                    value: '4',
                },
                {
                    label: 'Page 6',
                    description: 'April - Sueur',
                    value: '5',
                },
                {
                    label: 'Page 7',
                    description: 'April - Triste',
                    value: '6',
                },
                {
                    label: 'Page 8',
                    description: 'April - Wouah',
                    value: '7',
                },
                {
                    label: 'Page 9',
                    description: 'April - Bienvenue',
                    value: '8',
                },
                {
                    label: 'Page 10',
                    description: 'April - Cool (2)',
                    value: '9',
                },
            ]),
    );