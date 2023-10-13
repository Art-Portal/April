import { SlashCommandBuilder } from "discord.js";
import { deploy_commands } from "../../functions.mjs";
import config from "../../config.json" assert { type: "json" };
const { devId } = config;

export default {
    data: new SlashCommandBuilder()
        .setName("reload")
        .setDefaultMemberPermissions(0x8)
        .setDescription("Recharge les commandes du bot (dev only)."),
    async execute(interaction, client) {
        if (!interaction.user.id == devId)
            return void interaction.reply({ content: "Permission denied" });
        deploy_commands(client, false);
    },
};
