const { EmbedBuilder, StringSelectMenuBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')

module.exports = {
    async execute(interaction, client) {
        await interaction.deferReply({ ephemeral: true });
        const channel = interaction.options.getChannel('channel');

        const ticketEmbed = new EmbedBuilder();
        switch (interaction.options.getString('type')) {
            case 'commands':
                ticketEmbed
                    .setColor(`#7961fd`)
                    .setTitle("Commandes")
                    .setDescription("Tu veux passer commande ? Choisis ci-dessous en fonction de ton budget ! ^^")
                    .setThumbnail(`https://media.discordapp.net/attachments/867491241491038209/987292546180984832/april-welcome.png`);
                channel.send({
                    embeds: [ticketEmbed],
                    components: [ticketgraphismtyperow] });
                break;

            case 'support':
                ticketEmbed
                    .setColor(`#7961fd`)
                    .setTitle("Tickets")
                    .setDescription("Tu veux faire une demande de partenariat / contacter le staff ?\nChoisis avec le menu déroulant çi-dessous ! ^^")
                    .setThumbnail(`https://media.discordapp.net/attachments/867491241491038209/987292546180984832/april-welcome.png`);
                channel.send({
                    embeds: [ticketEmbed],
                    components: [ticketsupportRow]
                });
                break;
        }

        await interaction.editReply({ content: "Panel envoyé avec succès !" })
    }
}

const ticketgraphismtyperow = new ActionRowBuilder()
    .addComponents([
        new ButtonBuilder()
            .setCustomId('ticketopener_paid')
            .setLabel('Commande rémunérée')
            .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
            .setCustomId('ticketopener_free')
            .setLabel('Commande bénévole')
            .setStyle(ButtonStyle.Success),
    ])

    
const ticketsupportRow = new ActionRowBuilder()
    .addComponents(
        new StringSelectMenuBuilder()
            .setCustomId('ticket_create-support')
            .setPlaceholder('Choisissez le type de ticket que vous voulez !')
            .addOptions([
                {
                    label: 'Demande de partenariat',
                    value: 'partnership_option',
                    emoji: '💎'
                },
                {
                    label: 'Contacter le Staff',
                    value: 'contact_option',
                    emoji: '✉'
                },
                {
                    label: 'Report un utilisateur',
                    value: 'report_option',
                    emoji: '📣'
                }
            ]),
    );// Never gonna give you up :D 