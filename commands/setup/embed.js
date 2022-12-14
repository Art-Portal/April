const { SlashCommandBuilder, ActionRowBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('embed')
		.setDescription('Utiliser le créateur d\'embed de April')
        .setDefaultMemberPermissions(0x8)
        .addSubcommand(subcommand =>
			subcommand
				.setName('create')
				.setDescription('Lancer le processus de création d\'embed.')),
	async execute(interaction) {
        switch (interaction.options.getSubcommand()) {
            case 'create':
                await interaction.reply({ embeds: [baseembed], components: embedbuilderrows, ephemeral: true });
                break;
        }
	}
};
const baseembed = new EmbedBuilder()
    .setTitle("Constructeur d'embed")
    .setDescription("Bienvenue sur le constructeur interactif d'embed !\nChoisissez vos options (seule la description et le titre sont requis).\nUn fois fini, munissez-vous de l'id du salon dans lequel vous souhaitez envoyer le message et cliquez sur \"Envoyer\"");

const row1 = new ActionRowBuilder()
    .addComponents([
        new ButtonBuilder()
        .setCustomId("embedbuilder_create-author")
        .setLabel("Auteur")
        .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
        .setCustomId("embedbuilder_create-title")
        .setLabel("Titre")
        .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
        .setCustomId("embedbuilder_create-description")
        .setLabel("Description Text")
        .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
        .setCustomId("embedbuilder_create-footer")
        .setLabel("Texte du  bas")
        .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
        .setCustomId("embedbuilder_create-color")
        .setLabel("Couleur de l'embed")
        .setStyle(ButtonStyle.Secondary)
    ]);
const row2 = new ActionRowBuilder()
    .addComponents([
        new ButtonBuilder()
        .setCustomId("embedbuilder_create-thumbnail")
        .setLabel("Image miniature")
        .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
        .setCustomId("embedbuilder_create-image")
        .setLabel("Grande Image")
        .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
        .setCustomId(`embedbuilder_create-messagecontent`)
        .setStyle(ButtonStyle.Secondary)
        .setLabel("Ajouter un message à l'embed")
    ]);
const row3 = new ActionRowBuilder()
    .addComponents([
        new ButtonBuilder()
            .setCustomId("embedbuilder_create-post")
            .setStyle(ButtonStyle.Danger)
            .setLabel("Envoyer"),
        new ButtonBuilder()
            .setCustomId("embedbuilder_create-getexisting")
            .setStyle(ButtonStyle.Danger)
            .setLabel("Copier préexistant"),
        new ButtonBuilder()
            .setCustomId("embedbuilder_create-editexisting")
            .setStyle(ButtonStyle.Danger)
            .setLabel("Modifier préexistant"),
        new ButtonBuilder()
            .setCustomId("embedbuilder_create-createthread")
            .setStyle(ButtonStyle.Danger)
            .setLabel("Envoyer dans forum")
    ]);
const embedbuilderrows = [row1, row2, row3];
