const { EmbedBuilder, ThreadAutoArchiveDuration } = require('discord.js')

module.exports = {
    async execute(interaction, client){
		await interaction.deferUpdate({ ephemeral: true });
        
		const type = interaction.customId.replace("embedbuilder_","");
		let embedmsg = interaction.message.content || null;
		let newembed = new EmbedBuilder(interaction.message.embeds[0].data);
		switch(type){
			case 'author':
				let name = interaction.fields.getTextInputValue('embedbuilder_authorname');
				if (!name) name = "";
				newembed.setAuthor({ name: name });
				break;
			case 'title':
				let title = interaction.fields.getTextInputValue('embedbuilder_titlename');
				if (!title) title = null;
				newembed.setTitle(title);
				break;
			case 'description':
				let description = interaction.fields.getTextInputValue('embedbuilder_description');
				if (!description) description = "";
				newembed.setDescription(description);
				break;
			case 'footer':
				let footer = interaction.fields.getTextInputValue('embedbuilder_footer');
				if (!footer) footer = "";
				newembed.setFooter({text: footer});
				break;
			case 'color':
				let color = interaction.fields.getTextInputValue('embedbuilder_color');
				if (!color) color = "";
				newembed.setColor(color);
				break;
			case 'thumbnail':
				let thumbnail = interaction.fields.getTextInputValue('embedbuilder_thumbnail');
				if (!thumbnail) thumbnail = "";
				newembed.setThumbnail(thumbnail);
				break;
			case 'image':
				let image = interaction.fields.getTextInputValue('embedbuilder_image');
				if (!image) image = "";
				newembed.setImage(image);
				break;
			case 'messagecontent':
				embedmsg = interaction.fields.getTextInputValue('embedbuilder_messagecontent') || null;
				break;
				
			case 'post':
				const postchannelid = interaction.fields.getTextInputValue('embedbuilder_post');
				const postembedchannel = await client.channels.cache.find(channel => channel.id === postchannelid);
				await postembedchannel.send({ content: interaction.message.content+" ", embeds: [interaction.message.embeds[0]] });
				return interaction.followUp({ content: "L'embed a bien été envoyé ! (Dans <#"+postchannelid+">)", ephemeral: true });
				break;
				
			case 'getexisting':
				const getexistingchannelid = interaction.fields.getTextInputValue('embedbuilder_channelid');
				const getexistingmessageid = interaction.fields.getTextInputValue('embedbuilder_messageid');
				const getexistingembedchannel = await client.channels.cache.find(channel => channel.id === getexistingchannelid);
                if (!getexistingembedchannel) return interaction.followUp({ content: "Je n'ai pas trouvé le salon indiqué, merci de vérifier les ids", ephemeral: true })
                const getexistingmessage = await getexistingembedchannel.messages.fetch(getexistingmessageid)
                if (!getexistingmessage) return interaction.followUp({ content: "Je n'ai pas trouvé le message indiqué, merci de vérifier les ids", ephemeral: true })
                newembed = new EmbedBuilder(getexistingmessage.embeds[0].data) || newembed;
				break;
				
			case 'editexisting':
				const editexistingchannelid = interaction.fields.getTextInputValue('embedbuilder_channelid');
				const editexistingmessageid = interaction.fields.getTextInputValue('embedbuilder_messageid');
				const editexistingembedchannel = await client.channels.cache.find(channel => channel.id === editexistingchannelid);
                if (!editexistingembedchannel) return interaction.followUp({ content: "Je n'ai pas trouvé le salon indiqué, merci de vérifier les ids", ephemeral: true })
                const editexistingmessage = await editexistingembedchannel.messages.fetch(editexistingmessageid)
                if (!editexistingmessage) return interaction.followUp({ content: "Je n'ai pas trouvé le message indiqué, merci de vérifier les ids", ephemeral: true })
                if (!editexistingmessage.author.id == client.user.id) return interaction.followUp({ content: "Je ne peux pas modifier un embed que je n'ai pas envoyé moi-même -_-", ephemeral: true })
                await editexistingmessage.edit({ content: interaction.message.content+" ", embeds: [interaction.message.embeds[0]] });
                return interaction.followUp({ content: "L'embed a bien été modifié ! (Dans <#"+editexistingchannelid+">)", ephemeral: true });
				break;
			
			case 'createthread':
				const createthreadchannelid = interaction.fields.getTextInputValue('embedbuilder_channelid');
				const createthreadname = interaction.fields.getTextInputValue('embedbuilder_threadname');
				const createthreadchannel = await interaction.guild.channels.fetch(createthreadchannelid);
                if (!createthreadchannel) return interaction.followUp({ content: "Je n'ai pas trouvé le salon indiqué, merci de vérifier les ids", ephemeral: true })

				createthreadchannel.threads.create({
					name: createthreadname,
					autoArchiveDuration: ThreadAutoArchiveDuration.OneWeek,
					message: {
						content: interaction.message.content+" ",
						embeds: [interaction.message.embeds[0]],
					},
					reason: `April - Embedbuilder - Demandé par ${interaction.user.tag} (${interaction.user.id})`,
				})
				//.then(threadChannel => console.log(threadChannel))
				.catch(console.error);
				
		}
		
		await interaction.editReply({ embeds: [newembed], content: embedmsg });
    }
}