const { SlashCommandBuilder } = require('discord.js');
const Inspiration = require('./graphismecommands/inspiration.js');
const Palette = require('./graphismecommands/palette.js');
const Remix = require('./graphismecommands/remix.js');
const Blend = require('./graphismecommands/colorblend.js');

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
        )
        .addSubcommand(
            subcommand =>
                subcommand
                    .setName('remix')
                    .setDescription('Renvoie l\'image insérée avec un filtre appliqué.')
                    .addAttachmentOption(option => option
                        .setName('image')
                        .setDescription('Image à modifier')
                        .setRequired(true))
                    .addStringOption(option =>
                        option.setName('filter')
                            .setDescription('Le filtre appliqué')
                            .setRequired(true)
                            .addChoices(
                                { name: 'Invert', value: 'invert' },
                                { name: 'Nuance de gris', value: 'grayscale' },
                                { name: 'Sepia', value: 'sepia' },
                                { name: 'Flou', value: 'blur' },
                                { name: 'Pixelisé', value: 'pixelate' },
                                { name: 'Miroir', value: 'mirror' },
                                { name: 'Rotation', value: 'rotate' },
                                { name: 'Luminosité', value: 'brightness' },
                                { name: 'Vintage', value: 'vintage' },
                                { name: 'Peinture à l\'huile', value: 'oilpaint' },
                                { name: 'Aquarelle', value: 'watercolor' },
                                { name: 'Néon', value: 'neon' },
                            ))
        )
        .addSubcommand(
            subcommand =>
                subcommand
                    .setName('blend')
                    .setDescription('Combine deux couleurs pour en créer une troisième.')
                    .addStringOption(option =>
                        option.setName('color1')
                            .setDescription('La première couleur')
                            .setRequired(true))
                    .addStringOption(option =>
                        option.setName('color2')
                            .setDescription('La deuxième couleur')
                            .setRequired(true))
                    .addStringOption(option =>
                        option.setName('mode')
                            .setDescription('Le mode de fusion')
                            .setRequired(true)
                            .addChoices(
                                { name: 'Normal', value: 'normal' },
                                { name: 'Multiplication', value: 'multiply' },
                                { name: 'Écran', value: 'screen' },
                                { name: 'Overlay', value: 'overlay' },
                            ))
        ),
    async execute(interaction) {
        switch (interaction.options.getSubcommand()) {
            case 'inspiration':
                Inspiration.execute(interaction);
                break;
            case 'palette':
                Palette.execute(interaction);
                break;
            case 'remix':
                Remix.execute(interaction);
                break;
            case 'blend':
                Blend.execute(interaction);
                break;
        }
    }
};