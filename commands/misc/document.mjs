import { SlashCommandBuilder, StringSelectMenuBuilder, ActionRowBuilder, EmbedBuilder }  from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('documents')
        .setDescription('Afficher des documents')
        .addSubcommand(subcommand => subcommand
            .setName('sanctions')
            .setDescription('Afficher les documents des sanctions'))
        .addSubcommand(subcommand => subcommand
            .setName('artiste')
            .setDescription('Afficher le message de bienvenue des artistes')),

    async execute(interaction) {
        switch (interaction.options.getSubcommand()) {
            case 'sanctions':
                await interaction.reply({ components: [sanctionembedrow], ephemeral: true });
                break;
            case 'artiste':
                await interaction.reply({ embeds: [artisteEMBED] })
                break;
        };
    },
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

const artisteEMBED = new EmbedBuilder()
    .setDescription("# Bienvenue à toi en tant qu’artiste sur Art' Portal ! <:Y_PortalIconZZLogo:881610563262750751>  \n\n ❛━━━━━━━ ••• ━━━━━━━❜\n\n<:Z_UtileInvisible:1150409990201421937><:Z_UtileCloud:1150409880331616316> ・ **RÈGLES DE BASE** :\n\n<a:Z_UtileFleche2:963324131137433602>Dans le cas d'une commande bénévole, tu ne peux pas réclamer d'argent ou de « récompense » en échange de ton travail au client sauf s’il en fait lui même la proposition.\n\n<a:Z_UtileFleche2:963324131137433602>L’amabilité est une qualité importante ici, les insultes et messages agressifs sont donc interdit. Toutefois, si le client s’avère trop exigeant ou pressant, tu peux bien évidemment lui en faire poliment la remarque.\n\n<a:Z_UtileFleche2:963324131137433602> Il faut garder le ticket le plus clair possible. Ainsi, les discutions hors sujet entre artistes ou staff dans les tickets sont à grandement éviter (il y a le #tchat-artistes pour cela).\n\n❛━━━━━━━ ••• ━━━━━━━❜\n\n<:Z_UtileInvisible:1150409990201421937><:Z_UtileBook:962499173339529266>・ **FONCTIONNEMENT** :\n\n**__Globalement :__**\n<a:Z_UtileFleche1:963324135008780308>Les tickets de commandes apparaîtront en haut du serveur dans deux catégories distinctes : rémunérées et bénévoles. Si un emoji quelconque se trouve au début du nom du salon, cela signifie que la commande est déjà prise en charge par un artiste. Sinon c’est libre-service !\n\n<a:Z_UtileFleche1:963324135008780308>Tu peux proposer ton aide dans les commandes déjà prises en charge si l'artiste qui s'en occupe est d'accord.\n\n<a:Z_UtileFleche1:963324135008780308>Chaque artiste possède un __emoji unique__ choisi, ce qui lui permet de voir quelles sont les commandes qu'il a en cours de réalisation.\n\n**__Commandes rémunérées :__**\n<a:Z_UtileFleche1:963324135008780308>Les \"Portal Artiste\" ainsi que les \"Artiste Solo\" sont mentionnés quand une nouvelle commande apparait. Si la commande t'intéresse, __surtout__, ne la prend pas en charge immédiatement.\n\n<a:Z_UtileFleche1:963324135008780308>Pour prendre en charge une commande rémunérée, il faut mettre son __portfolio__ dans le __thread (fil)__ du même nom (si tu n'as pas de portfolio, envoie quelques-une de tes créations). C'est ensuite au __client de choisir__ parmi les artistes qui se sont proposés.\n\n<a:Z_UtileFleche1:963324135008780308>Si la commande t'intéresse mais que tu souhaites la réaliser pour plus cher ou au contraire pour moins cher, précise le en même temps que tu envoies ton portfolio.\n\n<a:Z_UtileFleche1:963324135008780308>Quand le client a désigné l'artiste qui lui convient, le ticket devient __privé__, c'est à dire accessible au staff, au client et à l'artiste seulement.\n\n**__Commandes bénévoles :__**\n<a:Z_UtileFleche1:963324135008780308>Pour prendre en charge une commande bénévole, clique seulement sur \"Prendre en charge\" (le bouton se trouve sur le premier message envoyé dans le salon).\n\n<a:Z_UtileFleche1:963324135008780308>N'hésite pas à dire __gentiment__ au client si tu penses que sa commande est irréalisable en bénévole.\n\n❛━━━━━━━ ••• ━━━━━━━❜\n\nMerci de ton investissement pour le serveur ! <:Z_UtileFlower:1150409911713411072>")
    .setColor("#8774f2")
