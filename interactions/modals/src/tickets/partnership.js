const { PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ChannelType, ButtonStyle } = require('discord.js');
const { progressBar } = require('../../../../config.json');

module.exports = {
    async execute(interaction){
		await interaction.reply({ content: `${progressBar}\nCréation du ticket en cours, merci de patienter !`, ephemeral: true });

        const invite = interaction.fields.getTextInputValue('partnership_servinvite');
        const description = interaction.fields.getTextInputValue('partnership_servdesc') || "Pas de description renseignée";

        await interaction.guild.channels.create({
            name: `partenariat-${interaction.user.username}`,
            type: ChannelType.GuildText,
            parent: '847188286043717632',
            permissionOverwrites: [
	    		{
                	id: interaction.user.id,
               		allow: [PermissionFlagsBits.ViewChannel],
           		},
                {
                    id: interaction.guild.id,
                    deny: [PermissionFlagsBits.ViewChannel],
                },
                {
                    id: '778016554066640896',
                    allow: [PermissionFlagsBits.ViewChannel],
                },

           	],
            reason: `April - Tickets partenariat - ${interaction.user.username} (${interaction.user.id})'`,
            topic: `Partenariat avec <@${interaction.user.id}>\nLien: ${invite}\nID: ${interaction.user.id}\nDate de la proposition: <t:${Math.floor(Date.now() / 1000)}:f>`
        }).then(async channel => {
            var btnrowTicket = new ActionRowBuilder()
                .addComponents([
                    new ButtonBuilder()
                    .setLabel("Fermer le ticket")
                    .setStyle(ButtonStyle.Danger)
                    .setEmoji("🔒")
                    .setCustomId(`ticket_close-${interaction.user.id}`),
                ]);

            const partnershipEmbed = new EmbedBuilder()
                .setColor(`#7961fd`)
                .setTitle("Partenariat")
                .setDescription("Un membre du staff viendra bientôt !\n> Votre serveur doit avoir minimum 200 membres !\n> Il doit également respecter les [ToS de discord](https://discord.com/terms)");

            await channel.send({ content: "Bienvenue <@" + interaction.user.id + "> !\n<@&778016554066640896> un ticket a été ouvert!", embeds: [partnershipEmbed], components: [btnrowTicket] }).then(msg => msg.pin());
			const commandtosendEMBED = new EmbedBuilder()
	    	    .setColor(`#7961fd`)
				.setTitle(`__Formulaire de partenariat Art' Portal__`)
				.addFields(
					{ 
						name: "・Lien vers le serveur / site・",
						value: `${invite}`,
						inline: false
					},
					{ 
						name: "・Description・",
						value: `\`\`\`${description}\`\`\``,
						inline: false
					},
				);
			await channel.send({embeds:[commandtosendEMBED]}).then(msg => msg.pin());
            if (invite.includes("discord.gg/")){
                await interaction.client.fetchInvite(invite)
                .then(async Sinvite => {
                    const servinfoEMBED = new EmbedBuilder()
                    .setTitle(Sinvite.guild.name)
                    .setFields([
                        {
                            name: "Créé :",
                            value : `<t:${Math.round(Sinvite.guild.createdTimestamp/1000)}>`,
                        },
                        {
                            name: "Membres :",
                            value : Sinvite.memberCount.toString(),
                        },
                        {
                            name: "Description :",
                            value : Sinvite.guild.description || "Aucune",
                        },
                        {
                            name: "ID :",
                            value : Sinvite.guild.id.toString(),
                        },
                        {
                            name: "Nombre de boosts :",
                            value: Sinvite.guild.premiumSubscriptionCount.toString()
                        }
                    ])
                    .setImage(Sinvite.guild.bannerURL())
                    .setThumbnail(Sinvite.guild.iconURL({ size: 1024 }))
                    if (Sinvite.guild.partnered) servinfoEMBED.setDescription("<:Z_UtilePartner:962499238783242271>")
                    await channel.send( { content: invite, embeds: [servinfoEMBED] } )
                }).catch(error => {
                    console.error(error)
                })
            }

            setTimeout(async function(){
                await interaction.editReply({ content: "Ton ticket a bien été créé ! (<#" + channel.id + ">)", ephemeral: true });
            },5000)

        }).catch(console.error);
    }
}