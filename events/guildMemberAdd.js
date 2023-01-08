const { guildId, generalChannelId, rulesChannelId, rolesChannelId } = require('../config.json');

module.exports = {
	name: 'guildMemberAdd',
	async execute(member, client) {
    const guild = member.guild;
    if (guild.id==guildId){
		const channel = await guild.channels.cache.find(c => c.id == generalChannelId );
		try{
			const welcomesticker = await guild.stickers.fetch('985933707317743666')
			const message = await channel.send({ content: welcomemessage.replace("[memberid]", member.id), stickers:[welcomesticker]});
			Promise.all([
					message.react('👋'),
			]).catch(error => console.error(error))
		}catch(error){
			console.log(error)
		};
	}
	},
};

const welcomemessage = 
`☆ Bienvenue <@[memberid]> ☆

Je t'invite à aller lire le <#${rulesChannelId}> ainsi que de prendre tes rôles dans <id:customize>
Nous espérons que tu passera un bon moment sur Art' Portal ! ^^`;
