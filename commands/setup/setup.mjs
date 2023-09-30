import { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ActionRowBuilder, StringSelectMenuBuilder, ChannelType }  from 'discord.js';
import SetupTickets  from './setupcommands/tickets.mjs';
import SetupPanel  from './setupcommands/panels.mjs';
import SetupMod  from './setupcommands/moderation.mjs';




export default {
    data: new SlashCommandBuilder()
        .setName('setup')
        .setDescription('Effectuer une mise en place.')
        .setDefaultMemberPermissions(0x8)
        .addSubcommand(
            subcommand => subcommand
                .setName('tickets')
                .setDescription('Mise en place des tickets.')
                .addStringOption(option => option
                    .setName('type')
                    .setDescription('Le type de tickets à mettre en place.')
                    .setRequired(true)
                    .setChoices(
                        {name: 'Commandes', value: 'commands'},
                        {name: 'Support', value: 'support'},
                    )
                )
                .addChannelOption(option => option
                    .setName('channel')
                    .setDescription('Choisissez le salon où l\'embed sera envoyé !')
                    .addChannelTypes(ChannelType.GuildText)
                    .setRequired(true))
        )
        .addSubcommand(
            subcommand => subcommand
                .setName('panel')
                .setDescription('Mise en place des panels.')
                .addStringOption(option => option
                    .setName('type')
                    .setDescription('Le type de panel à mettre en place.')
                    .setRequired(true)
                    .setChoices(
                        {name: 'Rolereact', value: 'rolereact'},
                        {name: 'Embed du rolereact', value: 'rolereactembed'},
                        {name: 'Candidatures', value: 'candidatures'},
                        {name: 'Embed des sanctions', value: 'sanctionembed'},
                        {name: 'Album Photo', value: 'albumphoto'}
                    )
                )
                .addChannelOption(option => option
                    .setName('channel')
                    .setDescription('Choisissez le salon où le panel sera envoyé !')
                    .addChannelTypes(ChannelType.GuildText)
                    .setRequired(true))
        )
        .addSubcommand(
            subcommand => subcommand
                .setName('moderation')
                .setDescription('Mise en place de la modération.')
                .addStringOption(option => option
                    .setName('type')
                    .setDescription('Le type de panel de modération à mettre en place.')
                    .setRequired(true)
                    .setChoices(
                        {name: 'Sanctions', value: 'sanctions'},
                        {name: 'Blacklist', value: 'blacklist'},
                    )
                )
                .addChannelOption(option => option
                    .setName('channel')
                    .setDescription('Choisissez le salon où le panel sera envoyé !')
                    .addChannelTypes(ChannelType.GuildText)
                    .setRequired(true))
        ),
    async execute(interaction) {
        switch (interaction.options.getSubcommand()) {
            case 'tickets':
                SetupTickets.execute(interaction);
                break;
            case 'panel':
                SetupPanel.execute(interaction);
                break;
            case 'moderation':
                SetupMod.execute(interaction);
                break;
        };
    },
};
