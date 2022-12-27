const { SlashCommandBuilder, SlashCommandSubcommandBuilder, SlashCommandChannelOption, ChannelType, SlashCommandStringOption, ButtonBuilder, ActionRowBuilder, EmbedBuilder } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
	.setName('toggle')
        .setDefaultMemberPermissions(0x8)
	.setDescription('Activer différents paramètres.')
        .addSubcommand(
            new SlashCommandSubcommandBuilder()
                .setName('commandes')
                .setDescription('Désactiver/Réactiver les commandes bénévoles')
                .addChannelOption(
                    new SlashCommandChannelOption()
                        .setName('channel')
                        .setDescription('Salon du panel')
                        .addChannelTypes(ChannelType.GuildText)
                        .setRequired(true)
                 )
                .addStringOption(
                    new SlashCommandStringOption()
                        .setName('messageid')
                        .setDescription('ID du message du panel')
                        .setRequired(true)
                )
        ),
    async execute(interaction, client) {
        await interaction.deferReply({ ephemeral: true })
        const channel = interaction.options.getChannel('channel');
        const message = await channel.messages.fetch(interaction.options.getString('messageid'))
        if (!message) return interaction.reply({ content: "Je n'ai pas trouvé le message correspondant, vérifiez votre id", ephemeral: true })

        const a = new ButtonBuilder(message.components[0].components[0].data)
        const b = new ButtonBuilder(message.components[0].components[1].data)
            .setDisabled(!message.components[0].components[1].data.disabled)

        const embed = new EmbedBuilder(message.embeds[0].data)
        if (message.components[0].components[1].data.disabled) {
	    embed.setDescription(description[0])
	} else {
	    embed.setDescription(description[1])
	}

        const msg = message.components[0].components[1].data.disabled ? "Commandes bénévoles activées !" : "Commandes bénévoles désactivées !"

        await message.edit({ components: [ new ActionRowBuilder().addComponents([a,b]) ], embeds: [embed] })
        await interaction.editReply({ ephemeral: true, content: msg })
    }
};

const description = [
    "Tu veux passer commande ? Choisis ci-dessous en fonction de ton budget ! ^^",
    "Tu veux passer commande ? Choisis ci-dessous en fonction de ton budget ! ^^\n\n**Les tickets bénévoles sont actuellement désactivés pour cause de surcharge !** Dès que la plupart seront écoulés, les commandes bénévoles rouvriront !\n\n*Vous pouvez regarder le nombre de commandes en cours via le </info server:947504536417878046> !*",
]
