import {
    ActionRowBuilder,
    StringSelectMenuBuilder,
    EmbedBuilder,
} from "discord.js";
export default {
    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });
        if (interaction.customId.endsWith("free")) {
            if (
                !interaction.member.roles.cache.has("1104145272499621928") &&
                !interaction.member.roles.cache.has("1104146176627970249") &&
                !interaction.member.roles.cache.has("1104146641721761843") &&
                !interaction.member.roles.cache.has("1104147264500400142")
            )
                return interaction.editReply({ embeds: [hasNotRoleEMBED] });
        }
        const ticketgraphismtyperow2 = new ActionRowBuilder().addComponents(
            new StringSelectMenuBuilder()
                .setCustomId(
                    `ticket_create-graphism-${interaction.customId.replace(
                        "ticketopener_",
                        "",
                    )}`,
                )
                .setPlaceholder("Choisissez le type de graphisme.")
                .addOptions([
                    {
                        label: "Logo/Logo",
                        value: "ticket_logo",
                        emoji: "🖼",
                    },
                    {
                        label: "Bannière/Banner (Discord)",
                        value: "ticket_discordbanner",
                        emoji: "🧩",
                    },
                    {
                        label: "Bannière/Banner (Youtube/Twitch)",
                        value: "ticket_ytbbanner",
                        emoji: "🧩",
                    },
                    {
                        label: "Dessin/Drawing",
                        value: "ticket_drawing",
                        emoji: "✏",
                    },
                    {
                        label: "Photo de profil/Profile picture",
                        value: "ticket_profilepicture",
                        emoji: "🎆",
                    },
                    {
                        label: "Overlay/Overlay",
                        value: "ticket_overlay",
                        emoji: "🎥",
                    },
                    {
                        label: "Emojis/Emotes",
                        value: "ticket_emojis",
                        emoji: "😀",
                    },
                    {
                        label: "Miniature/Thumbnail",
                        value: "ticket_minia",
                        emoji: "🪟",
                    },
                    {
                        label: "Montage/Editing",
                        value: "ticket_editing",
                        emoji: "🎬",
                    },
                    {
                        label: "Autre/Other",
                        value: "ticket_other",
                        emoji: "🎈",
                    },
                ]),
        );
        await interaction.editReply({ components: [ticketgraphismtyperow2] });
    },
};

const hasNotRoleEMBED = new EmbedBuilder()
    .setTitle("Désolé !")
    .setColor("#db2a06")
    .setDescription(
        "Pour pouvoir ouvrir un ticket bénévole, vous devez avoir le rôle <@&1104145272499621928> !\nCela nous permet de ne pas être noyés sous les commandes tout en laissant l'accès aux commandes bénévole possible.!",
    );
