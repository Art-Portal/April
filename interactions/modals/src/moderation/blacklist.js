const { EmbedBuilder } = require("discord.js");


module.exports = {
    async execute(interaction, client){
        await interaction.deferReply({ ephemeral: true });
        const ogMessageId = interaction.customId.split("-")[1];
        const userId = interaction.fields.getTextInputValue('userid');
        const blacklistuser = await client.database.blacklistdb.findOne({ where: { name: userId } });

        switch(interaction.customId.split("-")[0]){
            case 'blacklist_add':
                const blacklistusername = interaction.fields.getTextInputValue('username');
                const blacklistreason = interaction.fields.getTextInputValue('reason');
                
                if(blacklistuser) return interaction.followUp({content: "Cet utilisateur est déjà présent dans la blacklist !", ephemeral: true})

                const blacklisttimestamp = Math.floor(new Date().getTime()/1000)

                await client.database.blacklistdb.create({
                    name: userId,
                    username: blacklistusername,
                    reason: blacklistreason,
                    timestamp: blacklisttimestamp,
                    moderatorid: interaction.member.user.id,
                })

                const blacklistEMBED = new EmbedBuilder()
                .setTitle("⭐・FORMULAIRE DE BLACKLIST")
                .setDescription(`🗂️・**Pseudo** : ${blacklistusername}\n`
                +`📎・**Id** : ${userId}\n`
                +`📍・**Raison de l'infraction** : ${blacklistreason}\n`
                +`📆・**Date de l'infraction** : <t:${blacklisttimestamp}:D>\n`
                +`<:Z_UtileAdmin:962499217845260298>・**Modérateur.trice** : ${interaction.member.user.tag}`)



                await interaction.followUp({embeds: [blacklistEMBED], ephemeral: true});
                const channel = await interaction.guild.channels.cache.get("828938225313644595")
                await channel.send({ embeds: [blacklistEMBED] })
                await interaction.channel.messages.fetch(ogMessageId)
                    .then(message => {
                        message.delete();
                        interaction.channel.send({ embeds: message.embeds, components: message.components })
                    });
                break;
            case 'blacklist_remove':
                if (blacklistuser) {
                    const blacklistrmvEMBED = new EmbedBuilder()
                        .setTitle("⭐・FORMULAIRE DE BLACKLIST (Supprimé)")
                        .setDescription(`🗂️・**Pseudo** : ${blacklistuser.username}\n`
                        +`📎・**Id** : ${userId}\n`
                        +`📍・**Raison de l'infraction** : ${blacklistuser.reason}\n`
                        +`📆・**Date de l'infraction** : <t:${blacklistuser.timestamp}:D>\n`
                        +`<:Z_UtileAdmin:962499217845260298>・**Modérateur.trice** : <@${blacklistuser.moderatorid}>`)
                        await interaction.followUp({content: "Cette personne a bien été retirée de la blacklist !\n(Merci de supprimer manuellement l'embed correspondant à cette personne)", embeds: [blacklistrmvEMBED], ephemeral: true});
                    await client.database.blacklistdb.destroy({ where: { name: userId } });
                } else{
                    await interaction.followUp({content: "Il n'y a personne de blacklist avec l'id "+userId+"...", ephemeral: true});
                }
                break;
            case 'blacklist_check':
                if (blacklistuser) {
                    const blacklistcheckEMBED = new EmbedBuilder()
                        .setTitle("⭐・FORMULAIRE DE BLACKLIST")
                        .setDescription(`🗂️・**Pseudo** : ${blacklistuser.username}\n`
                        +`📎・**Id** : ${userId}\n`
                        +`📍・**Raison de l'infraction** : ${blacklistuser.reason}\n`
                        +`📆・**Date de l'infraction** : <t:${blacklistuser.timestamp}:D>\n`
                        +`<:Z_UtileAdmin:962499217845260298>・**Modérateur.trice** : <@${blacklistuser.moderatorid}>`)
                        await interaction.followUp({ embeds: [blacklistcheckEMBED], ephemeral: true});
                } else{
                    await interaction.followUp({ content: "Il n'y a personne de blacklist avec l'id "+userId+"...", ephemeral: true});
                }
                break;
        }
    }
}