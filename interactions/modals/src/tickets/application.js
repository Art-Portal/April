const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { progressBar } = require('../../../../config.json');

module.exports = {
    async execute(interaction, client){
		await interaction.reply({ content: `${progressBar}\nCréation de la candidature en cours, merci de patienter !`, ephemeral: true });

        const motivation = interaction.fields.getTextInputValue('application_motivation');
        const aptitudes = interaction.fields.getTextInputValue('application_aptitudes');
        const presentation = interaction.fields.getTextInputValue('application_presentation');
		let disponibilites = undefined;
        try{
			disponibilites = interaction.fields.getTextInputValue('application_disponibilites');
		} catch{}
		let examples = undefined;
		try {
			examples = interaction.fields.getTextInputValue('application_examples');
		} catch{}

        const applicationchannel = client.channels.cache.find(channel => channel.id === `${disponibilites ? '934898908407144469' : '950124391159697540'}`);

        const applicationEMBED = new EmbedBuilder()
    	    .setColor(`#7961fd`)
			.setTitle("Art'Portal - Candidature")
			.addFields(
				{ 
					name: "・Candidat.e・",
					value: `**Tag: ${interaction.user.tag}\nID: ${interaction.user.id}**`,
					inline: true
				},
				{ 
					name: "・Motivation・",
					value: `${motivation}`,
					inline: false
				},
				{
					name: `・Aptitudes・`,
					value: `${aptitudes}`,
					inline: false
				},
				{
					name: `・Présentation・`,
					value: `${presentation}`,
					inline: false
				},
				{
					name: `・${disponibilites ? "Disponibilité" : "Exemples de créations"}・`,
					value: `${disponibilites ? disponibilites : examples}`,
					inline: false
				},
				{
					name: `・Date de la candidature・`,
					value: `<t:${Math.floor(new Date().getTime()/1000)}:D>`,
					inline: true
				},
			);
		
		const openapplicationticket = new ButtonBuilder()
			.setCustomId("applicationopen_"+interaction.user.id)
			.setLabel("Ouvrir un ticket")
			.setStyle(ButtonStyle.Success)
			.setEmoji("🎫");
		const applicationrow = new ActionRowBuilder()
			.addComponents([openapplicationticket]);
		applicationchannel.send({embeds:[applicationEMBED], components:[applicationrow]});
		setTimeout(async function(){
			await interaction.editReply({ content: 'Votre candidature a bien été envoyée au staff !', embeds:[applicationEMBED], ephemeral: true });
		},5000)
    }
}