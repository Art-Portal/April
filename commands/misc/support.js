const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
		.setDescription('Afficher l\'aide du serveur'),
    async execute(interaction){
        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle('Tuto AP LOL')
                    .setColor('#4f00fc')
                    .setDescription('Description, placeholder, tuto hahahaha'),
                new EmbedBuilder()
                    .setTitle('SuItE Tuto AP LOL')
                    .setColor('#7500fc')
                    .setDescription('Suite Description, Suite placeholder, Suite tuto hahahaha'),
                new EmbedBuilder()
                    .setTitle('SuItE Tuto AP LOL')
                    .setColor('#9f00fc')
                    .setDescription('Suite Description, Suite placeholder, Suite tuto hahahaha'),
                new EmbedBuilder()
                    .setTitle('SuItE Tuto AP LOL')
                    .setColor('#c500fc')
                    .setDescription('Suite Description, Suite placeholder, Suite tuto hahahaha'),
                new EmbedBuilder()
                    .setTitle('SuItE Tuto AP LOL')
                    .setColor('#fc00f8')
                    .setDescription('Suite Description, Suite placeholder, Suite tuto hahahaha'),
            ]
        })
    }
}