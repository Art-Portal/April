const { EmbedBuilder } = require('discord.js');
const { sanctionChannelId } = require('../../../../config.json');

module.exports = {
    async execute(interaction, client){
        await interaction.deferReply({ephemeral: true})
        const userId = interaction.fields.getTextInputValue('userid');
        const user = await client.users.cache.get(userId);
        const member = await interaction.guild.members.cache.get(userId);
        let reason;
        try{
            reason = interaction.fields.getTextInputValue('reason');
        }catch{}

        const channel = await interaction.guild.channels.cache.get(sanctionChannelId);
        

        switch(interaction.customId.replace("modmodal_","")){
            case 'ban':
                if (member){
                    const userRoleRawPos = member.roles.highest.rawPosition;
                    const memberRoleRawPos = interaction.member.roles.highest.rawPosition;
                    if (user.id === interaction.user.id) return interaction.editReply({content: `Vous ne pouvez pas vous bannir vous-même! !`, ephemeral: true});
                    if (userRoleRawPos >= memberRoleRawPos) return interaction.editReply({content: `Vous ne pouvez pas bannir cet utilisateur.`, ephemeral: true});
                    if (!member.bannable) return interaction.editReply({content: `Je ne peux pas bannir cet utilisateur. Cela est dû au fait que l'utilisateur est modérateur/administrateur ou que son rôle est au dessus du rôle du bot...`, ephemeral: true});
                }

                await interaction.guild.bans.create(userId, {reason: reason + " - Banni.e par " + interaction.user.tag});
        
                const banEMBED = new EmbedBuilder()
                    .setColor(`#009500`)
                    .setThumbnail(`https://i.imgur.com/zcZsfNA.png`)
                    .setTitle(`➔ Art' Portal - Bannissement`)
                    .addFields(
                        { 
                            name: "・Utilisateur.trice・",
                            value: `${user ? `**Tag: ${user.tag}\n` : ""}ID: ${userId}**`,
                            inline: true
                        },
                        { 
                            name: "・Raison du bannissement・",
                            value: `**${reason !== null ? `${reason}` : 'Non précisé'}**`,
                            inline: true
                        },
                        {
                            name: `・Modérateur.trice・`,
                            value: `**${interaction.user.tag}**`
                        },
                        {
                            name: `・Date・`,
                            value: `<t:${Math.floor(new Date().getTime()/1000)}:D>`,
                            inline: true
                        },
                    );
                await interaction.editReply({embeds: [banEMBED], ephemeral: true});
                await channel.send({
                    embeds: [banEMBED]
                });
                await client.database.modlog.create({
                    name: userId,
                    username: user ? user.tag : "Inconnu",
                    type: "Ban",
                    reason: reason,
                    timestamp: Math.floor(new Date().getTime()/1000),
                    moderatorid: interaction.member.user.id
                });
                break;
            
            case 'kick':
                if (member){
                    const userRoleRawPos = member.roles.highest.rawPosition;
                    const memberRoleRawPos = interaction.member.roles.highest.rawPosition;
                    if(user.id === interaction.user.id) return interaction.editReply({content: `Vous ne pouvez pas vous expulser vous-même vous-même!`, ephemeral: true});
                    if(userRoleRawPos >= memberRoleRawPos) return interaction.editReply({content: `Vous ne pouvez pas expulser cet utilisateur.`, ephemeral: true});
                    if(!member.bannable) return interaction.editReply({content: `Je ne peux pas expulser cet utilisateur. Cela est dû au fait que l'utilisateur est modérateur/administrateur ou que son rôle est au dessus du rôle du bot...`, ephemeral: true});
                } else return interaction.editReply({ content: `L'utilisateur spécifié n'est pas présent sur le serveur !` });
                await member.kick( {reason: reason + " - Expulsé.e par " + interaction.member.user.tag} );
        
                const kickEMBED = new EmbedBuilder()
                .setColor(`#009500`)
                .setThumbnail(`https://i.imgur.com/zcZsfNA.png`)
                .setTitle(`➔ Art' Portal - Expulsion`)
                .addFields(
                    { 
                        name: "・Utilisateur.trice・",
                        value: `**Tag: ${user.tag}\nID: ${user.id}**`,
                        inline: true
                    },
                    { 
                        name: "・Raison de l'expulsion",
                        value: `**${reason !== null ? `${reason}` : 'No reason specified'}**`,
                        inline: true
                    },
                    {
                        name: `・Modérateur.trice・`,
                        value: `**${interaction.member.user.tag}**`
                    },
                    {
                        name: `・Date・`,
                        value: `<t:${Math.floor(new Date().getTime()/1000)}:D>`,
                        inline: true
                    },
                );
                await interaction.editReply({embeds: [kickEMBED], ephemeral: true});
                await channel.send({
                    embeds: [kickEMBED]
                });
                await client.database.modlog.create({
                    name: user.id,
                    username: user.tag,
                    type: "Kick",
                    reason: reason,
                    timestamp: Math.floor(new Date().getTime()/1000),
                    moderatorid: interaction.member.user.id
                })
                break;
            case 'timeout':
                if (member){
                    const userRoleRawPos = member.roles.highest.rawPosition;
                    const memberRoleRawPos = interaction.member.roles.highest.rawPosition;
                    if(member.user.id === interaction.user.id) return interaction.editReply({content: `Vous ne pouvez pas vous mute vous-même vous-même! !`, ephemeral: true});
                    if(userRoleRawPos >= memberRoleRawPos) return interaction.editReply({content: `Vous ne pouvez pas mute cet utilisateur.`, ephemeral: true});
                    if(!member.bannable) return interaction.editReply({content: `Je ne peux pas mute cet utilisateur. Cela est dû au fait que l'utilisateur est modérateur/administrateur ou que son rôle est au dessus du rôle du bot...`, ephemeral: true});
                } else return interaction.editReply({ content: `L'utilisateur spécifié n'est pas présent sur le serveur !` });
                const duration = Number(interaction.fields.getTextInputValue('duration'));
                if (isNaN(duration)) return interaction.editReply({ content: `\`${duration}\` n'est pas un nombre ! Merci de spécifier correctement la durée du mute !` })
                await member.timeout(duration * 60 * 1000, {reason: reason + " - Mute par " + interaction.member.user.tag} );
        
                const muteEMBED = new EmbedBuilder()
                .setColor(`#009500`)
                .setThumbnail(`https://i.imgur.com/zcZsfNA.png`)
                .setTitle(`➔ Art' Portal - Mute`)
                .addFields(
                    {
                        name: "・Utilisateur.trice・",
                        value: `**Tag: ${member.user.tag}\nID: ${member.user.id}**`,
                        inline: true
                    },
                    { 
                        name: "・Raison du mute",
                        value: `**${reason !== null ? `${reason}` : 'No reason specified'}**`,
                        inline: true
                    },
                    {
                        name: `・Modérateur.trice・`,
                        value: `**${interaction.member.user.tag}**`
                    },
                    {
                        name: `・Date・`,
                        value: `<t:${Math.floor(new Date().getTime()/1000)}:D>`,
                        inline: true
                    },
                );
                await interaction.editReply({embeds: [muteEMBED], ephemeral: true});
                await channel.send({
                    embeds: [muteEMBED]
                });
                await client.database.modlog.create({
                    name: user.id,
                    username: user.tag,
                    type: "Timeout",
                    reason: reason,
                    timestamp: Math.floor(new Date().getTime()/1000),
                    moderatorid: interaction.member.user.id
                })
                break;
            case 'warn':
                if (!member) return interaction.editReply({ content: `L'utilisateur spécifié n'est pas présent sur le serveur !` });
                const warnEMBED = new EmbedBuilder()
                .setColor(`#009500`)
                .setThumbnail(`https://i.imgur.com/zcZsfNA.png`)
                .setTitle(`➔ Art' Portal - Warn`)
                .addFields(
                    {
                        name: "・Utilisateur.trice・",
                        value: `**Tag: ${member.user.tag}\nID: ${member.user.id}**`,
                        inline: true
                    },
                    { 
                        name: "・Raison du warn",
                        value: `**${reason !== null ? `${reason}` : 'No reason specified'}**`,
                        inline: true
                    },
                    {
                        name: `・Modérateur.trice・`,
                        value: `**${interaction.member.user.tag}**`
                    },
                    {
                        name: `・Date・`,
                        value: `<t:${Math.floor(new Date().getTime()/1000)}:D>`,
                        inline: true
                    },
                );
                await interaction.editReply({embeds: [warnEMBED], ephemeral: true});
                await channel.send({
                    embeds: [warnEMBED]
                });
                await client.database.modlog.create({
                    name: userId,
                    username: user.tag,
                    type: "Warn",
                    reason: reason,
                    timestamp: Math.floor(new Date().getTime()/1000),
                    moderatorid: interaction.member.user.id
                });
                const tagList = await client.database.modlog.findAll({ where: { name: userId }, attributes: ['type'] });
                let warncount = 0
                tagList.forEach( async (value) => {
                    if(value.type=="Warn") warncount++
                })
                if (warncount>=3){
                    await interaction.followUp({content:`:warning: Cet utilisateur a désormais ${warncount} warns !`, ephemeral: true})
                }
                break;
            case 'check':
                const sanctionList = await client.database.modlog.findAll({ where: { name: userId } });
                if (!sanctionList || sanctionList==0) return interaction.followUp({content:"Il n'y a aucune trace de cet utilisateur dans les modlogs !", ephemeral: true});
                let embeddescription = "\n";
                sanctionList.forEach( async (value) => {
                    embeddescription = embeddescription + `${value.type}: \`${value.reason}\`, <t:${value.timestamp}:D>, <@${value.moderatorid}>\n\n`
                })
                const blacklistEMBED = new EmbedBuilder()
                .setTitle("⭐・MODLOGS pour " +sanctionList[0].username)
                .setDescription(embeddescription.substring(0, 4000))

                await interaction.followUp({embeds: [blacklistEMBED], ephemeral: true});
                break;
        }
    }
}
