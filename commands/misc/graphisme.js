const { SlashCommandBuilder } = require('discord.js');
const Inspiration = require('./graphismecommands/inspiration.js');
const Palette = require('./graphismecommands/palette.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('graphisme')
        .setDescription('Diverse commandes pour le graphisme.')
        .addSubcommand(
            subcommand =>
                subcommand
                    .setName('inspiration')
                    .setDescription('Une citation, suggestion de couleur ou proposition de méthode.')
        )
        .addSubcommand(
            subcommand =>
                subcommand
                    .setName('palette')
                    .setDescription('Une palette harmonieuse générée aléatoirement.')
        ),
    async execute(interaction) {
        switch (interaction.options.getSubcommand()) {
            case 'inspiration':
                Inspiration.execute(interaction);
                break;
            case 'palette':
                Palette.execute(interaction);
                break;
        }
    }
};