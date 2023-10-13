import { EmbedBuilder } from "discord.js";
import { inspect } from "util";

const errorEmbed = new EmbedBuilder().setColor("Red");

export default {
    name: "error",
    async execute() {
        errorEmbed
            .setTitle("Discord API Error")
            .setURL(
                "https://discordjs.guide/popular-topics/errors.html#api-errors",
            )
            .setDescription(
                `\`\`\`${inspect(err, { depth: 0 }).slice(0, 1000)}\`\`\``,
            )
            .setTimestamp();

        return client.errorCatcherWebhook.send({ embeds: [errorEmbed] });
    },
};
