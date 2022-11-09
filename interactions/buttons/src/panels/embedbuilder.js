const { ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require("discord.js");


module.exports = {
    async execute(interaction, client){
        const ebauthor = new ModalBuilder()
            .setCustomId('embedbuilder_author')
            .setTitle('Constructeur d\'embed: Auteur')
            .setComponents(
                new ActionRowBuilder()
                    .addComponents(
                        new TextInputBuilder()
                        .setCustomId('embedbuilder_authorname')
                        .setLabel('Nom de l\'auteur')
                        .setStyle(TextInputStyle.Short)
                            .setMaxLength(256)
                            .setPlaceholder('(Pas forcément une personne tkt)')
                            .setValue(interaction.message.embeds[0].author ? interaction.message.embeds[0].author["name"]: "")
                            .setRequired(false),
                    )
            );
        const ebtitle = new ModalBuilder()
            .setCustomId('embedbuilder_title')
            .setTitle('Constructeur d\'embed: Titre')
            .setComponents(
                new ActionRowBuilder()
                    .addComponents(
                        new TextInputBuilder()
                            .setCustomId('embedbuilder_titlename')
                            .setLabel('Titre de l\' embed')
                            .setStyle(TextInputStyle.Short)
                            .setMaxLength(256)
                            .setPlaceholder('Le titre affiché en grand')
                            .setValue(interaction.message.embeds[0].title ? interaction.message.embeds[0].title: "")
                            .setRequired(false),
                    )
        );

        const ebdescription = new ModalBuilder()
            .setCustomId('embedbuilder_description')
            .setTitle('Constructeur d\'embed: Description')
            .setComponents(
                new ActionRowBuilder()
                    .addComponents(
                        new TextInputBuilder()
                            .setCustomId('embedbuilder_description')
                            .setLabel('Description de l\' embed')
                            .setStyle(TextInputStyle.Paragraph)
                            .setMaxLength(4000)
                            .setPlaceholder('Le corps de texte de l\'embed')
                            .setValue(interaction.message.embeds[0].description ? interaction.message.embeds[0].description : "")
                            .setRequired(true)
                    )
            );

        const ebfooter = new ModalBuilder().setCustomId('embedbuilder_footer').setTitle('Constructeur d\'embed: Texte du bas').setComponents(new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('embedbuilder_footer').setLabel('Texte du bas de l\' embed').setStyle(TextInputStyle.Paragraph).setMaxLength(2048).setPlaceholder('Texte du bas').setValue(interaction.message.embeds[0].footer ? interaction.message.embeds[0].footer["text"] : "").setRequired(false)));
        const ebcolor = new ModalBuilder().setCustomId('embedbuilder_color').setTitle('Constructeur d\'embed: Couleur').setComponents(new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('embedbuilder_color').setLabel('Couleur de l\' embed').setStyle(TextInputStyle.Short).setMinLength(7).setMaxLength(7).setPlaceholder('Code hexadécimal (#ffffff)').setRequired(false)));
        //row 2
        const ebthumbnail = new ModalBuilder().setCustomId('embedbuilder_thumbnail').setTitle('Constructeur d\'embed: Image miniature').setComponents(new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('embedbuilder_thumbnail').setLabel('Lien de l \'image').setStyle(TextInputStyle.Short).setPlaceholder('(Image en haut à droite)').setRequired(false)));
        const ebimage = new ModalBuilder().setCustomId('embedbuilder_image').setTitle('Constructeur d\'embed: Image').setComponents(new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('embedbuilder_image').setLabel('Lien de l \'image').setStyle(TextInputStyle.Short).setPlaceholder('(Image en grand)').setRequired(false)));
        const ebmessagecontent = new ModalBuilder().setCustomId('embedbuilder_messagecontent').setTitle('Constructeur d\'embed: Message à part').setComponents(new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('embedbuilder_messagecontent').setLabel('Texte').setStyle(TextInputStyle.Paragraph).setMaxLength(2000).setPlaceholder('(Max 2000 caractères)').setRequired(false)));

        //row3
        const ebpost = new ModalBuilder().setCustomId('embedbuilder_post').setTitle('Constructeur d\'embed: Poster l\'embed').setComponents(new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('embedbuilder_post').setLabel('Id du salon où poster l\' embed').setStyle(TextInputStyle.Short).setMinLength(18).setMaxLength(20).setPlaceholder('ID du salon').setRequired(true)));
        const ebegetexisting = new ModalBuilder()
            .setCustomId('embedbuilder_getexisting')
            .setTitle('Constructeur d\'embed: Récupérer')
            .setComponents([
                new ActionRowBuilder()
                    .addComponents(
                        new TextInputBuilder()
                            .setCustomId('embedbuilder_channelid')
                            .setLabel('Id du salon où est l\' embed')
                            .setStyle(TextInputStyle.Short)
                            .setMinLength(18)
                            .setMaxLength(20)
                            .setPlaceholder('ID du salon')
                            .setRequired(true)
                    ),
                new ActionRowBuilder()
                    .addComponents(
                        new TextInputBuilder()
                            .setCustomId('embedbuilder_messageid')
                            .setLabel('Id du message à copier')
                            .setStyle(TextInputStyle.Short)
                            .setMinLength(18)
                            .setMaxLength(20)
                            .setPlaceholder('ID du message')
                            .setRequired(true)
                    )]
            );

            const ebeeditexisting = new ModalBuilder()
            .setCustomId('embedbuilder_editexisting')
            .setTitle('Constructeur d\'embed: Modifier')
            .setComponents([
                new ActionRowBuilder()
                    .addComponents(
                        new TextInputBuilder()
                            .setCustomId('embedbuilder_channelid')
                            .setLabel('Id du salon où est l\' embed')
                            .setStyle(TextInputStyle.Short)
                            .setMinLength(18)
                            .setMaxLength(20)
                            .setPlaceholder('ID du salon')
                            .setRequired(true)
                    ),
                new ActionRowBuilder()
                    .addComponents(
                        new TextInputBuilder()
                            .setCustomId('embedbuilder_messageid')
                            .setLabel('Id du message à éditer')
                            .setStyle(TextInputStyle.Short)
                            .setMinLength(18)
                            .setMaxLength(20)
                            .setPlaceholder('ID du message')
                            .setRequired(true)
                    )]
            );

            const ebcreatethread = new ModalBuilder()
            .setCustomId('embedbuilder_createthread')
            .setTitle('Constructeur d\'embed: Forum')
            .setComponents([
                new ActionRowBuilder()
                    .addComponents(
                        new TextInputBuilder()
                            .setCustomId('embedbuilder_channelid')
                            .setLabel('Id du salon où envoyer l\' embed')
                            .setStyle(TextInputStyle.Short)
                            .setMinLength(18)
                            .setMaxLength(20)
                            .setPlaceholder('ID du salon')
                            .setRequired(true)
                    ),
                new ActionRowBuilder()
                    .addComponents(
                        new TextInputBuilder()
                            .setCustomId('embedbuilder_threadname')
                            .setLabel('Nom du salon à créer')
                            .setStyle(TextInputStyle.Short)
                            .setMinLength(1)
                            .setMaxLength(100)
                            .setPlaceholder('Nom du thread à créer')
                            .setRequired(true)
                    )]
            );

        const embedbuildermodals = {
            //row1
            "author": ebauthor,
            "title": ebtitle,
            "description": ebdescription,
            "footer": ebfooter,
            "color": ebcolor,
            //row2
            "image": ebimage,
            "thumbnail": ebthumbnail,
            "messagecontent": ebmessagecontent,
            //row3
            "post": ebpost,
            "getexisting": ebegetexisting,
            "editexisting": ebeeditexisting,
            "createthread": ebcreatethread,
        }


        if (!interaction.member.roles.cache.has('778016554066640896')) return interaction.reply({ content: "Tu n'a pas la permission de faire ça!", ephemeral: true });
        switch(interaction.customId.split('-')[0]){
            case 'embedbuilder_create':
                const type = interaction.customId.split('-')[1]
                interaction.showModal(
                    embedbuildermodals[type], {
                        interaction: interaction,
                        client: client
                    }
                )
        }
    }
}


