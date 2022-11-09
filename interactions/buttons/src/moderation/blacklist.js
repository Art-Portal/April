const { ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require("discord.js");


module.exports = {
    async execute(interaction, client){
        if (!interaction.member.roles.cache.has('778016554066640896')) return interaction.reply({ content: "Tu n'a pas la permission de faire ça!", ephemeral: true });
        switch(interaction.customId){
            case 'blacklist_add':
                const blacklistmodal = new ModalBuilder()
                    .setCustomId('blacklist_add-'+interaction.message.id)
                    .setTitle('Art\'Portal - Blacklist')
                    .addComponents(
                        new ActionRowBuilder()
                            .addComponents(
                                new TextInputBuilder()
                                    .setCustomId('username')
                                    .setLabel('Pseudo de l\'utilisateur à ajouter')
                                    .setStyle(TextInputStyle.Short)
                                    .setMinLength(6)
                                    .setMaxLength(30)
                                    .setPlaceholder('Ex: CoolMan#4094')
                                    .setRequired(true)
                                ),
                        new ActionRowBuilder()
                            .addComponents(
                                new TextInputBuilder()
                                    .setCustomId('userid')
                                    .setLabel('ID de l\'utilisateur à ajouter')
                                    .setStyle(TextInputStyle.Short)
                                    .setMinLength(18)
                                    .setMaxLength(20)
                                    .setPlaceholder('Ex: 697438073646088194')
                                    .setRequired(true)
                                ),
                        new ActionRowBuilder()
                            .addComponents(
                                new TextInputBuilder()
                                    .setCustomId('reason')
                                    .setLabel('Raison de la blacklist')
                                    .setStyle(TextInputStyle.Paragraph)
                                    .setMinLength(10)
                                    .setMaxLength(500)
                                    .setPlaceholder('Ex: Quitte le serveur avec une commande ouverte')
                                    .setRequired(true)
                                ),
                    );
                await interaction.showModal(blacklistmodal)
                break;
            case 'blacklist_remove':
                const rmvblacklistmodal = new ModalBuilder()
                    .setCustomId('blacklist_remove-'+interaction.message.id)
                    .setTitle('Art\'Portal - Blacklist')
                    .addComponents(
                        new ActionRowBuilder()
                            .addComponents(
                                new TextInputBuilder()
                                    .setCustomId('userid')
                                    .setLabel('ID de l\'utilisateur à retirer')
                                    .setStyle(TextInputStyle.Short)
                                    .setMinLength(18)
                                    .setMaxLength(20)
                                    .setPlaceholder('Ex: 697438073646088194')
                                    .setRequired(true)
                                ),
                    )
                    await interaction.showModal(rmvblacklistmodal)
                break;
            case 'blacklist_check':
                const checkblacklistmodal = new ModalBuilder()
                    .setCustomId('blacklist_check-'+interaction.message.id)
                    .setTitle('Art\'Portal - Blacklist')
                    .addComponents(
                        new ActionRowBuilder()
                            .addComponents(
                                new TextInputBuilder()
                                    .setCustomId('userid')
                                    .setLabel('ID de l\'utilisateur à vérifier')
                                    .setStyle(TextInputStyle.Short)
                                    .setMinLength(18)
                                    .setMaxLength(20)
                                    .setPlaceholder('Ex: 697438073646088194')
                                    .setRequired(true)
                                ),
                    )
                    await interaction.showModal(checkblacklistmodal)
                break;
        }
    }
}

