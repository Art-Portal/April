const { ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports = {
    async execute(interaction, client) {
        switch (interaction.customId) {
            case 'apply_staff':
                await interaction.showModal(staffapplication)
                break;
            case 'apply_artist':
                await interaction.showModal(artistapplication)
                break;
        }
    }
}

const staffapplication = new ModalBuilder()
.setCustomId('application_staff')
.setTitle('Art\'Portal - Candidature')
.addComponents(
    new ActionRowBuilder()
        .addComponents(
            new TextInputBuilder()
            .setCustomId('application_motivation')
            .setLabel('Expliquez vos motivations')
            .setStyle(TextInputStyle.Paragraph)
            .setMinLength(300)
            .setMaxLength(1000)
            .setPlaceholder('Ex: Cela me permettrait de m\'enrichir culturellement')
            .setRequired(true)
        ),
    new ActionRowBuilder()
        .addComponents(
            new TextInputBuilder()
            .setCustomId('application_aptitudes')
            .setLabel('Vos aptitudes')
            .setStyle(TextInputStyle.Paragraph)
            .setMinLength(300)
            .setMaxLength(1000)
            .setPlaceholder('En modération, en diplomatie...')
            .setRequired(true)
        ),
    new ActionRowBuilder()
        .addComponents(
            new TextInputBuilder()
            .setCustomId('application_presentation')
            .setLabel('Présentez-vous')
            .setStyle(TextInputStyle.Paragraph)
            .setMinLength(300)
            .setMaxLength(1000)
            .setPlaceholder('Présentez-vous, votre expérience, vos attentes...')
            .setRequired(true)
        ),
    new ActionRowBuilder()
        .addComponents(
            new TextInputBuilder()
            .setCustomId('application_disponibilites')
            .setLabel('Vos disponibilités')
            .setStyle(TextInputStyle.Paragraph)
            .setMinLength(20)
            .setMaxLength(1000)
            .setPlaceholder('Ex: Le lundi de 16 à 20h, le dimanche toute la journée...')
            .setRequired(true)
        ),
);

const artistapplication = new ModalBuilder()
.setCustomId('application_artist')
.setTitle('Art\'Portal - Candidature Artiste')
.addComponents(
    new ActionRowBuilder()
        .addComponents(
            new TextInputBuilder()
            .setCustomId('application_motivation')
            .setLabel('Expliquez vos motivations')
            .setStyle(TextInputStyle.Paragraph)
            .setMinLength(300)
            .setMaxLength(1000)
            .setPlaceholder('Ex: Cela me permettrait de m\'enrichir culturellement')
            .setRequired(true)
        ),
    new ActionRowBuilder()
        .addComponents(
            new TextInputBuilder()
            .setCustomId('application_aptitudes')
            .setLabel('Vos aptitudes')
            .setStyle(TextInputStyle.Paragraph)
            .setMinLength(300)
            .setMaxLength(1000)
            .setPlaceholder('En modération, en diplomatie...')
            .setRequired(true)
        ),
    new ActionRowBuilder()
        .addComponents(
            new TextInputBuilder()
            .setCustomId('application_presentation')
            .setLabel('Présentez-vous')
            .setStyle(TextInputStyle.Paragraph)
            .setMinLength(300)
            .setMaxLength(1000)
            .setPlaceholder('Présentez-vous, votre expérience, vos attentes...')
            .setRequired(true)
        ),
    new ActionRowBuilder()
        .addComponents(
            new TextInputBuilder()
            .setCustomId('application_examples')
            .setLabel('Exemples de créations')
            .setStyle(TextInputStyle.Paragraph)
            .setMinLength(20)
            .setMaxLength(1000)
            .setPlaceholder('(Liens vers les créations)')
            .setRequired(true)
        ),
);