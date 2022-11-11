const { PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ChannelType, ButtonStyle } = require('discord.js');
const { progressBar } = require('../../../../config.json');

module.exports = {
    async execute(interaction){
		await interaction.reply({ content: `${progressBar}\nCréation du ticket en cours, merci de patienter !`, ephemeral: true });

        const reason = interaction.fields.getTextInputValue('reason');
        const messageslink = interaction.fields.getTextInputValue('messageslink') || "Pas de message renseigné";
        const screens = interaction.fields.getTextInputValue('screens') || "Pas de capture d'écran renseignée";

        await interaction.guild.channels.create({
            name: `report-${interaction.user.username}`,
            type: ChannelType.GuildText,
            parent: '916721453121040424',
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
            reason: `April - Tickets report - ${interaction.user.username} (${interaction.user.id})'`,
            topic: `Report de <@${interaction.user.id}>\nID: ${interaction.user.id}\nDate du report: <t:${Math.floor(Date.now() / 1000)}:f>`
        }).then(async channel => {
            var btnrowTicket = new ActionRowBuilder()
                .addComponents([
                    new ButtonBuilder()
                    .setLabel("Fermer le ticket")
                    .setStyle(ButtonStyle.Danger)
                    .setEmoji("🔒")
                    .setCustomId(`ticket_close-${interaction.user.id}`),
                ]);

            const reportEmbed = new EmbedBuilder()
                .setColor(`#7961fd`)
                .setTitle("Report")
                .setDescription("Un membre du staff viendra bientôt !\n> En cas de report troll, vous serez sanctionné vous-même !");

            await channel.send({ content: "Bienvenue <@" + interaction.user.id + "> !\n<@&778016554066640896> un ticket a été ouvert!", embeds: [reportEmbed], components: [btnrowTicket] }).then(msg => msg.pin());
			const commandtosendEMBED = new EmbedBuilder()
	    	    .setColor(`#7961fd`)
				.setTitle(`__Formulaire de report Art' Portal__`)
				.addFields(
					{ 
						name: "・Raison・",
						value: `${reason}`,
						inline: false
					},
					{ 
						name: "・Lien(s) vers un/des message(s)・",
						value: `${messageslink}`,
						inline: false
					},
					{ 
						name: "・Lien(s) vers un/des capture(s) d'écran・",
						value: `${screens}`,
						inline: false
					},
				);
			await channel.send({embeds:[commandtosendEMBED]}).then(msg => msg.pin());
            
            setTimeout(async function(){
                await interaction.editReply({ content: "Ton ticket a bien été créé ! (<#" + channel.id + ">)", ephemeral: true });
            },5000)
            
        }).catch(console.error);
    }
}