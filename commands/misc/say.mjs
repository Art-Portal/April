import { SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("say")
        .setDescription("Faire envoyer un message au bot")
        .setDefaultMemberPermissions(0x8)
        .addStringOption((option) =>
            option
                .setName("message")
                .setDescription("Message à envoyer")
                .setRequired(true),
        )
        .addStringOption((option) =>
            option
                .setName("sticker")
                .setDescription("Ajouter un sticker au message (id du sticker)")
                .setRequired(false),
        )
        .addChannelOption((option) =>
            option
                .setName("destination")
                .setDescription("Sélectionnez le salon où envoyer le message!")
                .setRequired(false),
        )
        .addStringOption((option) =>
            option
                .setName("reply")
                .setDescription("Id du message auquel répondre!")
                .setRequired(false),
        ),
    async execute(interaction) {
        let msgtosend = interaction.options.getString("message");
        msgtosend = msgtosend.substring(0, 2000).replace(/\\n/g, "\n");

        let channeltosend = interaction.options.getChannel("destination");
        if (!channeltosend) {
            channeltosend = interaction.channel;
        }

        const replyMessageId = interaction.options.getString("reply") || null;

        try {
            channeltosend.send({
                content: msgtosend,
                reply: { messageReference: replyMessageId },
                stickers: interaction.options.getString("sticker")
                    ? [interaction.options.getString("sticker")]
                    : null,
            });
            await interaction.reply({
                content: "Message envoyé !",
                ephemeral: true,
            });
        } catch {
            await interaction.reply({
                content:
                    "Erreur : Je n'ai probablement pas la permission d'envoyer des messages ou le message est trop long",
                ephemeral: true,
            });
        }
    },
};
