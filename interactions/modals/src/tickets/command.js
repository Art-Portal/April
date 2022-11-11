const { PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ChannelType, ButtonStyle, ThreadAutoArchiveDuration } = require('discord.js')
const { progressBar } = require('../../../../config.json');

module.exports = {
    async execute(interaction, client){
		await interaction.reply({ content: `${progressBar}\nCréation du ticket en cours, merci de patienter !`, ephemeral: true });
        let remuneration;

        try{
    		remuneration = interaction.fields.getTextInputValue('command_remuneration');
        }catch{
            remuneration = null;
        }
        const commandType = cmdTypeDict[interaction.customId.replace("command_","")];
		const theme = interaction.fields.getTextInputValue('command_theme');
		const desc = interaction.fields.getTextInputValue('command_description');
		const top = interaction.fields.getTextInputValue('command_toppings');
		const baseimg = interaction.fields.getTextInputValue('command_baseimage');

        const commandtosendEMBED = new EmbedBuilder()
        .setColor(`#7961fd`)
        .setTitle(`__Formulaire de commande Art' Portal__ (${remuneration ? "Rémunéré": "Non rémunéré"})`)
        .addFields(
            { 
                name: "・Type de graphisme・",
                value: `${commandType? commandType : "Non spécifié"}`,
                inline: false
            },
            { 
                name: "・Thème imposé・",
                value: `${theme? theme : "Non spécifié"}`,
                inline: false
            },
            {
                name: `・Description de l'image・`,
                value: `${desc? desc : "Non spécifié"}`,
                inline: false
            },
            {
                name: `・Effets, détails, texte à ajouter・`,
                value: `${top? top : "Non spécifié"}`,
                inline: false
            },
            {
                name: `・Image(s) de Base・`,
                value: `${baseimg? baseimg : "Non spécifié"}`,
                inline: false
            },
        );

        if(remuneration){
            commandtosendEMBED.addFields(
                {
                    name: 'Budget',
                    value: String(remuneration),
                    inline: false
                }
            )
        }

        const isalreadybl = await client.database.blacklistdb.findOne({ where: { name: interaction.user.id } });
        if(isalreadybl) {
            const bllogchannel = await interaction.guild.channels.fetch('1036589658647314502')
            await bllogchannel.send({ content: `<:Z_UtileDanger:962499193862225940>**Utilisateur blacklisté** (Raison: ${isalreadybl.get('reason')})<:Z_UtileDanger:962499193862225940>\nCommande de : <@${interaction.user.id}> (${interaction.user.id})\nCréation de la commande : <t:${Math.floor(Date.now() / 1000)}:f>`, embeds:[commandtosendEMBED] });
        }
        if(isalreadybl) return interaction.editReply({content: "Vous avez été blacklisté des tickets sur le serveur pour la raison: `"+isalreadybl.get('reason')+"`\nPour contester cette décision, vous pouvez ouvrir un ticket dans le salon <#869093817503076363>", ephemeral: true})


        await interaction.guild.channels.create({
            name: `${remuneration ? "rémunéré": "bénévole"} - ` + interaction.user.username,
            type: ChannelType.GuildText,
            parent: remuneration ? "1040706105321467934" : "780559502105378836",
            permissionOverwrites: [
	    		{
                	id: interaction.user.id,
               		allow: [PermissionFlagsBits.ViewChannel],
           		},
                {
                    id: interaction.guild.id,
                    deny: [PermissionFlagsBits.ViewChannel],
                    allow:[PermissionFlagsBits.SendMessagesInThreads],
                },
                {
                    id: '778016554066640896',
                    allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ManageChannels],
                },

                {
                    id: '780007193688801321',
                    allow: [PermissionFlagsBits.ViewChannel],
                },
                {
                    id: '778016552108556388',
                    allow: [PermissionFlagsBits.ViewChannel],
                },

           	],
            reason: `April - Tickets commandes - ${interaction.user.username} (${interaction.user.id})'`,
            topic: `${commandType} pour <@${interaction.user.id}>\nID: ${interaction.user.id}\nDate de la commande: <t:${Math.floor(Date.now() / 1000)}:f>`
        }).then(async channel => {
            var btnrowTicket = new ActionRowBuilder()
                .addComponents([
                    new ButtonBuilder()
                    .setLabel("Prendre en charge")
                    .setStyle(ButtonStyle.Success)
                    .setEmoji("✏")
                    .setCustomId("ticket_takeCommand-"+interaction.user.id),
                    new ButtonBuilder()
                    .setLabel("Fermer le ticket")
                    .setStyle(ButtonStyle.Danger)
                    .setEmoji("🔒")
                    .setCustomId(`ticket_close-${interaction.user.id}`),
                ]);

            const commandEmbed = new EmbedBuilder()
                .setColor(`#7961fd`)
                .setTitle("Commande: " + commandType)
                .setDescription("Un artiste viendra prendre votre commande bientôt !\n> :x: Si l'artiste ne reçoit aucune réponse pendant plusieurs jours de suite, le ticket sera fermé/mis en attente. Merci également de faire l'entièreté de la commande sur ce ticket et de ne pas partir en mp.\n> Si vous quittez le serveur avec ce ticket ouvert, vous serez blacklist: vous ne pourrez pas repasser commande.\n> En cas d'irrespect ou de manquement au <#766336361984294913>, votre ticket sera fermé et vous serez blacklist, sans sommation.");

            await channel.send({ content: "Bienvenue <@" + interaction.user.id + "> !\nPortal'Artistes, un ticket a été ouvert!", embeds: [commandEmbed], components: [btnrowTicket] }).then(msg => msg.pin());
			await channel.send({embeds:[commandtosendEMBED]}).then(msg => msg.pin());
            
            setTimeout(async function(){
                await interaction.editReply({ content: "Ton ticket a bien été créé ! (<#" + channel.id + ">)", ephemeral: true });
            },5000)

            if(remuneration){
                await channel.threads.create({
					name: "Portfolios",
					autoArchiveDuration: ThreadAutoArchiveDuration.OneWeek,
					message: {
						content: `Commande de ${interaction.user.tag} (${interaction.user.id})`,
					},
					reason: `April - Portfolios - Commande de ${interaction.user.tag} (${interaction.user.id})`,
				})
            }
            
            
            const logchannel = await interaction.guild.channels.fetch('1036589658647314502')
			await logchannel.send({ content: `Commande de : <@${interaction.user.id}> (${interaction.user.id})\nCréation de la commande : <t:${Math.floor(Date.now() / 1000)}:f>`, embeds:[commandtosendEMBED] });
        }).catch(console.error);
    }
}

const cmdTypeDict = {
    "logo": "Logo",
    "discordbanner": "Bannière Discord",
    "ytbbanner": "Bannière Youtube/...",
    "drawing": "Dessin",
    "profilepicture": "Photo de profil",
    "video": "Video/Montage",
    "overlay": "Overlay de stream",
    "emojis": "Émojis/Stickers",
    "minia": "Miniature",
    "other": "Autre",
};
