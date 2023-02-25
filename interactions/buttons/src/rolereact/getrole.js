const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    async execute(interaction) {
        let bruhplsworksimpler = interaction.customId.split("-")[1] == "refresh";
        if(!bruhplsworksimpler){
            await interaction.deferReply({
                ephemeral: true
            })
        } else {
            await interaction.deferUpdate();
        }

        const rolecache = interaction.member.roles.cache;
        const roleEMBED = new EmbedBuilder()
            .setAuthor({
                name: interaction.user.tag
            })
            .setColor("#7961fd")
            .setThumbnail(interaction.user.avatarURL());

        let rolesembeddescriptions;
        let count = 0;

        switch (interaction.customId.split("-")[0]) {
            case 'getrole_genre':
                rolesembeddescriptions="**Rôles de genre:**";
                genderroles.forEach(async (element) => {
                    if (rolecache.some(role => role.id == element)){
                        rolesembeddescriptions = rolesembeddescriptions+`\n<@&${element}>`;
                        count++;
                    }
                })
                if(count==0) rolesembeddescriptions = rolesembeddescriptions + "\nAucun";
                roleEMBED.setDescription(rolesembeddescriptions + getroletuto);

                const rolegenreactionrow = new ActionRowBuilder()
                    .setComponents([
                        new ButtonBuilder()
                            .setCustomId("getrole_genre-refresh")
                            .setEmoji("🔁")
                            .setStyle(ButtonStyle.Secondary)
                    ])

                await interaction.editReply({
                    embeds: [roleEMBED],
                    components: [rolegenrerow, rolegenreactionrow]
                })
                break;

            case 'getrole_hobbies':
                rolesembeddescriptions = "**Rôles de hobbies:**";
                hobbiesroles.forEach(async (element) => {
                    if (rolecache.some(role => role.id == element)){
                        rolesembeddescriptions = rolesembeddescriptions+`\n<@&${element}>`;
                        count++;
                    }
                })
                if(count==0) rolesembeddescriptions = rolesembeddescriptions + "\nAucun";
                roleEMBED.setDescription(rolesembeddescriptions + getroletuto);

                const rolehobbiesactionrow = new ActionRowBuilder()
                    .setComponents([
                        new ButtonBuilder()
                            .setCustomId("getrole_hobbies-refresh")
                            .setEmoji("🔁")
                            .setStyle(ButtonStyle.Secondary)
                    ])

                await interaction.editReply({
                    embeds: [roleEMBED],
                    components: [rolehobbiesrow, rolehobbiesactionrow]
                })
                break;

            case 'getrole_color':
                rolesembeddescriptions = "**Rôles de couleur:**";
                colorroles.forEach(async (element) => {
                    if (rolecache.some(role => role.id == element)){
                        rolesembeddescriptions = rolesembeddescriptions+`\n<@&${element}>`;
                        count++;
                    }
                })
                if(count==0) rolesembeddescriptions = rolesembeddescriptions + "\nAucun";
                roleEMBED.setDescription(rolesembeddescriptions + getroletuto);

                const rolecoloractionrow = new ActionRowBuilder()
                    .setComponents([
                        new ButtonBuilder()
                            .setCustomId("getrole_color-refresh")
                            .setEmoji("🔁")
                            .setStyle(ButtonStyle.Secondary)
                    ])

                await interaction.editReply({
                    embeds: [roleEMBED],
                    components: [rolecolorrow, rolecoloractionrow]
                })
                break;

            case 'getrole_pings':
                rolesembeddescriptions = "**Rôles de notifications:**";
                notifroles.forEach(async (element) => {
                    if (rolecache.some(role => role.id == element)){
                        rolesembeddescriptions = rolesembeddescriptions+`\n<@&${element}>`;
                        count++;
                    }
                })
                if(count==0) rolesembeddescriptions = rolesembeddescriptions + "\nAucun"
                roleEMBED.setDescription(rolesembeddescriptions + getroletuto);

                const rolepingsactionrow = new ActionRowBuilder()
                    .setComponents([
                        new ButtonBuilder()
                            .setCustomId("getrole_pings-refresh")
                            .setEmoji("🔁")
                            .setStyle(ButtonStyle.Secondary)
                    ])

                await interaction.editReply({
                    embeds: [roleEMBED],
                    components: [rolepingsrow, rolepingsactionrow]
                })
                break;

            case 'getrole_list':
                let rolelistmessage;
                
                rolelistmessage = "**Rôles de couleur:**";
                colorroles.forEach(async (element) => {
                    if (rolecache.some(role => role.id == element)) rolelistmessage = rolelistmessage+`\n<@&${element}>`
                })

                rolelistmessage = rolelistmessage + "\n\n**Rôles de genre:**";
                genderroles.forEach(async (element) => {
                    if (rolecache.some(role => role.id == element)) rolelistmessage = rolelistmessage+`\n<@&${element}>`
                })
                
                rolelistmessage = rolelistmessage + "\n\n**Rôles de hobbies:**";
                hobbiesroles.forEach(async (element) => {
                    if (rolecache.some(role => role.id == element)) rolelistmessage = rolelistmessage+`\n<@&${element}>`
                })

                rolelistmessage = rolelistmessage + "\n\n**Rôles de notifications:**";
                notifroles.forEach(async (element) => {
                    if (rolecache.some(role => role.id == element)) rolelistmessage = rolelistmessage+`\n<@&${element}>`
                })


                
                roleEMBED
                    .setTitle("Vos rôles sur Art'Portal")
                    .setDescription(rolelistmessage);

                const rolelistactionrow = new ActionRowBuilder()
                    .setComponents([
                        new ButtonBuilder()
                            .setCustomId("getrole_list-refresh")
                            .setEmoji("🔁")
                            .setStyle(ButtonStyle.Secondary)
                    ])

                await interaction.editReply({
                    components: [rolelistactionrow],
                    embeds:[roleEMBED]
                })
                break;
        }
    }
}

const getroletuto = "\n\n**Fonctionnement:**\nSélectionnez une option du menu déroulant pour récupérer le rôle correspondant.\nSi vous possédez déjà le rôle, il vous sera retiré à la place !";

const colorroles = [
    "947489800330559510",
    "947485362610139196",
    "947496679580500008",
    "947490255311872000",
    "947490189096415273",
    "947490417245556796",
    "947490339848060968"
]

const genderroles = [
    "769918743626252318",
    "768393897134784532",
    "772041733278007307"
]

const hobbiesroles = [
    "949745563824431124",
    "949746089987289128",
    "949746175920181278",
    "949746259898544229",
    "949746341754601502",
    "949746559019540511",
    "949746641764749324",
    "949746678519439370"
]

const notifroles = [
    "768396461763067914",
    "784646468958945280",
    "774693756901392404",
    "770568527156346880",
    "770723703948181525",
    "799249307362131978",
    "847207140098572318",
    "955143137226010704"
]


const rolegenrerow = new ActionRowBuilder()
    .addComponents(
        new StringSelectMenuBuilder()
            .setCustomId('roleselect_genre')
            .setPlaceholder('Choisissez votre pronom / Choose your pronoun')
            .addOptions([
                {
                    label: 'Elle / She',
                    value: 'role_genre_woman',
                    emoji: '882588094711345152',
                },
                {
                    label: 'Il / He',
                    value: 'role_genre_man',
                    emoji: '882588094711345152',
                },
                {
                    label: 'Autre / Other',
                    value: 'role_genre_other',
                    emoji: '882588094711345152',
                }
            ]),
    );

const rolecolorrow = new ActionRowBuilder()
    .addComponents(
        new StringSelectMenuBuilder()
            .setCustomId('roleselect_color')
            .setPlaceholder('Choisissez une couleur / Choose a color')
            .addOptions([
                {
                    label: 'Bleu/Blue',
                    value: 'role_color_blue',
                    emoji: '🔵'
                },
                {
                    label: 'Vert/Green',
                    value: 'role_color_green',
                    emoji: '🟢'
                },
                {
                    label: 'Orange/Orange',
                    value: 'role_color_orange',
                    emoji: '🟠'
                },
                {
                    label: 'Rouge/Red',
                    value: 'role_color_red',
                    emoji: '🔴'
                },
                {
                    label: 'Blanc/White',
                    value: 'role_color_white',
                    emoji: '⚪'
                },
                {
                    label: 'Jaune/Yellow',
                    value: 'role_color_yellow',
                    emoji: '🟡'
                },
                {
                    label: 'Rose/Pink',
                    value: 'role_color_pink',
                    emoji: '947495875654066207'
                }
            ]),
    );
const rolehobbiesrow = new ActionRowBuilder()
    .addComponents(
        new StringSelectMenuBuilder()
            .setCustomId('roleselect_hobbies')
            .setPlaceholder('Choisissez vos hobbies / Choose your hobbies')
            .setMaxValues(8)
            .addOptions([
                {
                    label: 'Graphisme/Graphism',
                    value: 'role_hobbies_graphism',
                    emoji: '🖌️'
                },
                {
                    label: 'Musique/Music',
                    value: 'role_hobbies_music',
                    emoji: '🎵'
                },
                {
                    label: 'Jeux vidéos/Videogames',
                    value: 'role_hobbies_videogames',
                    emoji: '🎮'
                },
                {
                    label: 'Mangas-BDs/Mangas-Comics',
                    value: 'role_hobbies_mangascomics',
                    emoji: '📙'
                },
                {
                    label: 'Romans/Novels',
                    value: 'role_hobbies_novels',
                    emoji: '📚'
                },
                {
                    label: 'Programmation/Programming',
                    value: 'role_hobbies_programming',
                    emoji: '💻'
                },
                {
                    label: 'Jeu de société/Board game',
                    value: 'role_hobbies_boardgame',
                    emoji: '🎲'
                },
                {
                    label: 'Cuisine/Cooking',
                    value: 'role_hobbies_cooking',
                    emoji: '🍽'
                },
            ]),
    );
const rolepingsrow = new ActionRowBuilder()
    .addComponents(
        new StringSelectMenuBuilder()
            .setCustomId('roleselect_pings')
            .setPlaceholder('Choisissez vos notifications / Choose your pings')
            .setMaxValues(7)
            .addOptions([
                {
                    label: 'Annonces/Announcements',
                    value: 'role_ping_announcements',
                    emoji: '📣'
                },
                {
                    label: 'Sondages/Polls',
                    value: 'role_ping_polls',
                    emoji: '📊'
                },
                {
                    label: 'Youtube/Youtube',
                    value: 'role_ping_youtube',
                    emoji: '🎞'
                },
                {
                    label: 'Evenements/Events',
                    value: 'role_ping_events',
                    emoji: '📌'
                },
                {
                    label: 'Partenariats/Partnerships',
                    value: 'role_ping_partnerships',
                    emoji: '🧩'
                },
                {
                    label: 'Animations/Animations',
                    value: 'role_ping_animations',
                    emoji: '🎉'
                },
                {
                    label: 'Ecologie/Ecology',
                    value: 'role_ping_ecology',
                    emoji: '🍄'
                },
                {
                    label: 'Instagram/Instagram',
                    value: 'role_ping_insta',
                    emoji: '🖼️'
                },
            ]),
    );