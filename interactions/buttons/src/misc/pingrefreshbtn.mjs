import { EmbedBuilder }  from 'discord.js';

export default {
    async execute(interaction, client) {
        try {
            const sent = await interaction.channel.send({
                content: 'Pinging...',
            });
            const latency = new EmbedBuilder()
                .setColor(`#7961fd`)
                .setTitle(`🏓 Pong ! Aprıl v4.0.0\n`)
                .setDescription(
                    "\n"
                    + `**Latence :** ${sent.createdTimestamp - interaction.createdTimestamp}ms\n`
                    + `**API :** ${Math.round(client.ws.ping)}ms`
                )
            await interaction.update({
                content: " ",
                embeds: [latency]
            });
            await sent.delete();
        } catch(error) {
            console.error(error)
        }
    }
}