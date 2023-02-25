const { SlashCommandBuilder, StringSelectMenuBuilder, ActionRowBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('documents')
        .setDescription('Afficher des documents')
        .addSubcommand(subcommand =>
            subcommand
            .setName('sanctions')
            .setDescription('Afficher les documents des sanctions')),

    async execute(interaction) {
        switch (interaction.options.getSubcommand()) {
            case 'sanctions':
                await interaction.reply({ components: [sanctionembedrow], ephemeral: true });
                break;
        }
    }
};


const sanctionembedrow = new ActionRowBuilder()
    .addComponents(
        new StringSelectMenuBuilder()
            .setCustomId('document_sanctions')
            .setPlaceholder('Navigateur')
            .addOptions([
                {
                    label: 'Page 0',
                    description: 'Couverture',
                    value: '0',
                },
                {
                    label: 'Page 1',
                    description: 'Notes',
                    value: '1',
                },
                {
                    label: 'Page 2',
                    description: 'Table des matières',
                    value: '2',
                },
                {
                    label: 'Page 3',
                    description: 'Articles 1 & 2',
                    value: '3',
                },
                {
                    label: 'Page 4',
                    description: 'Article 3',
                    value: '4',
                },
                {
                    label: 'Page 5',
                    description: 'Articles 4 & 5',
                    value: '5',
                },
                {
                    label: 'Page 6',
                    description: 'Articles 6 & 7',
                    value: '6',
                },
            ]),
    );
