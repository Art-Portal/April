const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setemoji')
		.setDescription('Définir l\'émoji de l\'artiste ciblé.e')
        .setDefaultMemberPermissions(0x4)
        .addStringOption(option =>
            option.setName('emoji')
                .setDescription('Émoji')
                .setRequired(true))
        .addUserOption(option => 
            option.setName('artist')
                .setDescription('Artiste à qui ajouter l\'émoji !')
                .setRequired(true)),
	async execute(interaction, client) {       
        const emoji = interaction.options.getString('emoji');
        const member = interaction.options.getMember('artist');

        const userAlreadyPresent = await client.database.artists.findOne({ where: { name: member.id } });
        const emojiAlreadyPresent = await client.database.artists.findOne({ where: { emoji: emoji } });
        if(emojiAlreadyPresent) return interaction.reply({ content: `Émoji ${emoji} déjà utilisé ! (Par <@${emojiAlreadyPresent.name}>)`, ephemeral: true });

        if(userAlreadyPresent){
            await client.database.artists.update({ emoji: emoji }, {where: { name: member.id }});
            await interaction.reply({ content: `Émoji de <@${member.id}> modifié en ${emoji} !`, ephemeral: true });
        } else {
            await client.database.artists.create({
                name: member.id,
                emoji: emoji,
            });
            await interaction.reply({ content: `Émoji de <@${member.id}> défini sur ${emoji} !`, ephemeral: true });
        }
    },
};