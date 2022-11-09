const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, PermissionFlagsBits } = require('discord.js')

module.exports = {
    async execute(interaction){
        if(!interaction.member.permissions.has(requiredPermissions[interaction.customId])) return interaction.reply({ content: "Vous n'avez pas la permission d'effectuer cette action !", ephemeral: true });
        //console.log(modpanelModalList[interaction.customId]);
        //return interaction.reply({ content: 'test', ephemeral: true });
        return interaction.showModal(modpanelModalList[interaction.customId]);
    }
}

const requiredPermissions = {
    modpanel_ban: PermissionFlagsBits.BanMembers,
    modpanel_kick: PermissionFlagsBits.KickMembers,
    modpanel_timeout: PermissionFlagsBits.ModerateMembers,
    modpanel_warn: PermissionFlagsBits.ManageMessages,
    modpanel_check: PermissionFlagsBits.ManageMessages,
}

const modpanelModalList = {
    modpanel_ban: new ModalBuilder()
        .setCustomId('modmodal_ban')
        .setTitle('Art\'Portal - Bannissement')
        .addComponents(
            new ActionRowBuilder()
                .addComponents(
                    new TextInputBuilder()
                        .setCustomId('userid')
                        .setLabel('Indiquez l\'ID de la personne à bannir')
                        .setStyle(TextInputStyle.Short)
                        .setMinLength(18)
                        .setMaxLength(21)
                        .setPlaceholder('Ex: 697438073646088194')
                        .setRequired(true)
                ),
            new ActionRowBuilder()
                .addComponents(
                    new TextInputBuilder()
                        .setCustomId('reason')
                        .setLabel('Raison du ban')
                        .setStyle(TextInputStyle.Paragraph)
                        .setMinLength(10)
                        .setMaxLength(1000)
                        .setPlaceholder('Ex: Insultes, Irrespect')
                        .setRequired(true)
                ),
        ),

    modpanel_kick: new ModalBuilder()
        .setCustomId('modmodal_kick')
        .setTitle('Art\'Portal - Expulsion')
        .addComponents(
            new ActionRowBuilder()
                .addComponents(
                    new TextInputBuilder()
                        .setCustomId('userid')
                        .setLabel('Indiquez l\'ID de la personne à kick')
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
                        .setLabel('Raison du kick')
                        .setStyle(TextInputStyle.Paragraph)
                        .setMinLength(10)
                        .setMaxLength(1000)
                        .setPlaceholder('Ex: Insultes, Irrespect')
                        .setRequired(true)
                ),
        ),

    modpanel_timeout: new ModalBuilder()
        .setCustomId('modmodal_timeout')
        .setTitle('Art\'Portal - Mute')
        .addComponents(
            new ActionRowBuilder()
                .addComponents(
                    new TextInputBuilder()
                        .setCustomId('userid')
                        .setLabel('Indiquez l\'ID de la personne à mute')
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
                    .setLabel('Raison du mute')
                    .setStyle(TextInputStyle.Paragraph)
                    .setMinLength(10)
                    .setMaxLength(1000)
                    .setPlaceholder('Ex: Spam')
                    .setRequired(true)
                ),
            new ActionRowBuilder()
                .addComponents(
                    new TextInputBuilder()
                    .setCustomId('duration')
                    .setLabel('Durée du mute EN MINUTES')
                    .setStyle(TextInputStyle.Short)
                    .setMinLength(1)
                    .setMaxLength(4)
                    .setPlaceholder('Ex: 1, 60...')
                    .setRequired(true)
                ),
        ),
    modpanel_warn: new ModalBuilder()
        .setCustomId('modmodal_warn')
        .setTitle('Art\'Portal - Warn')
        .addComponents(
            new ActionRowBuilder()
                .addComponents(
                    new TextInputBuilder()
                        .setCustomId('userid')
                        .setLabel('Indiquez l\'ID de la personne à avertir')
                        .setStyle(TextInputStyle.Short)
                        .setMinLength(18)
                        .setMaxLength(20)
                        .setPlaceholder('Ex: 697438073646088194')
                        .setRequired(true)
                ),
            new ActionRowBuilder()
                .addComponents([
                    new TextInputBuilder()
                        .setCustomId('reason')
                        .setLabel('Raison du warn')
                        .setStyle(TextInputStyle.Paragraph)
                        .setMinLength(10)
                        .setMaxLength(1000)
                        .setPlaceholder('Ex: Spam')
                        .setRequired(true)
                ]),
        ),
    modpanel_check: new ModalBuilder()
        .setCustomId('modmodal_check')
        .setTitle('Art\'Portal - Modlog')
        .addComponents(
            new ActionRowBuilder()
                .addComponents(
                    new TextInputBuilder()
                        .setCustomId('userid')
                        .setLabel('ID de l\'utilisateur')
                        .setStyle(TextInputStyle.Short)
                        .setMinLength(18)
                        .setMaxLength(20)
                        .setPlaceholder('Id de la personne à vérifier !')
                        .setRequired(true)
                    ),
        )
}