const { ContextMenuCommandBuilder, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports = {
	data: new ContextMenuCommandBuilder()
        .setName('Bannissement')
        .setType(2)
        .setDefaultMemberPermissions(0x4),

    async execute(interaction) {
		const user = interaction.targetUser;

        const banModal = new ModalBuilder()
            .setTitle(`Bannissement`)
            .setCustomId('modmodal_ban')
            .setComponents([
                new ActionRowBuilder()
                    .setComponents(
                        new TextInputBuilder()
                            .setCustomId('userid')
                            .setLabel('Id de la personne')
                            .setRequired(true)
                            .setValue(user.id)
                            .setPlaceholder('Id automatiquement complétée')
                            .setStyle(TextInputStyle.Short)
                            .setMinLength(18)
                            .setMaxLength(21)
                    ),
                new ActionRowBuilder()
                    .setComponents(
                        new TextInputBuilder()
                            .setCustomId('reason')
                            .setLabel('Raison du ban')
                            .setRequired(true)
                            .setPlaceholder('Ex: Spam contenu 18+')
                            .setStyle(TextInputStyle.Short)
                            .setMinLength(10)
                            .setMaxLength(1000)
                    ),
                
            ])
        interaction.showModal(banModal)
    }
};
