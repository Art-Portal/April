import { EmbedBuilder, SlashCommandBuilder, version }  from 'discord.js';
import moment  from "moment";
import format from "moment-duration-format";

import packageJson from '../../package.json' assert { type: 'json' };
const botversion = packageJson.version;

export default {
    data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('Obtenir des informations diverses.')
		.addSubcommand(subcommand =>
			subcommand
				.setName('user')
				.setDescription('Obtenir des informations sur un utilisateur.')
				.addUserOption(option => 
					option.setName('target')
					.setDescription('Utilisateur ciblé')
					.setRequired(true)))
		.addSubcommand(subcommand =>
			subcommand
				.setName('server')
				.setDescription('Obtenir des informations sur le serveur.'))
		.addSubcommand(subcommand =>
			subcommand
				.setName('april')
				.setDescription('Obtenir des informations sur April')),
	
	async execute(interaction, client) {
        switch(interaction.options.getSubcommand()) {
            case 'user':
                const user = interaction.options.getUser('target');
                const member = interaction.options.getMember('target')//interaction.guild.members.cache.get(user.id);
                const embedUSERINFO = new EmbedBuilder()
                
                if (user) {
                    embedUSERINFO
                        .setAuthor({
                            name: user.tag,
                            iconURL: user.avatarURL()
                        })
                        .setColor("Blurple")
                        .setThumbnail(user.avatarURL())
                        .setDescription(`<@${user.id}>`)
                        .addFields([
                            {
                                name: "👤 Informations sur le compte",
                                value: ``
                                    +`<:invisibleSpacer:1038116840360120360><:iconID:1038063974807261195> **ID:** ${user.id}\n`
                                    +`<:invisibleSpacer:1038116840360120360><:iconProfile:1038064029064773724> **Nom complet:** ${user.tag}\n`
                                    +`<:invisibleSpacer:1038116840360120360><:iconTimer:1038063915151654932> **Créé:** <t:${Math.floor(user.createdTimestamp / 1000)}:d>`
                                    ,
                                inline: false
                            }
                        ]);

                    if (member){
                        embedUSERINFO.addFields([
                            {
                                name: "📋 Information sur le membre",
                                value: 
                                    `<:invisibleSpacer:1038116840360120360><:iconTimer:1038063915151654932> **A rejoint le serveur:** <t:${member.user.id=="697438073646088194" ? "1604430645" : Math.floor(member.joinedTimestamp / 1000)}:R>\n`
                                    +`<:invisibleSpacer:1038116840360120360><:iconProfile:1038064029064773724> **Nickname:** ${member.nickname || `Aucun`}\n`
                                    +`<:invisibleSpacer:1038116840360120360><:IconAnnouncement:1038063917026508881> **Plus haut rôle:** ${member.roles.hoist ? member.roles.hoist.name : "Aucun"}`
                                    ,
                                inline: false	
                            },
                            {
                                name: `📝 Rôles [${member.roles.cache.size - 1}]`,
                                value: member.roles.cache.size ? member.roles.cache.map(roles => `**${roles}**`).slice(0, 20).join(" ") : "None",
                                inline: false
                            }])
                    }
                } else {
					embedUSERINFO.setDescription("Utilisateur inconnu")
				}

				await interaction.reply({
					embeds: [embedUSERINFO],
					ephemeral: false
				});
				break;
            
            case 'server':
                const owner = await interaction.guild.fetchOwner();
                let openticketqty = 0;
				interaction.guild.channels.cache.forEach(element => {
                    if (element.name.includes("bénévole") || element.name.includes("rémunéné")) openticketqty++;
                });
				let takenticketsqty = 0;
				interaction.guild.channels.cache.forEach(element => {
					if ((element.name.includes("bénévole") &&!element.name.startsWith("bénévole")) || (element.name.includes("rémunéré") && !element.name.startsWith("rémunéré"))) takenticketsqty++;
				});
				const embedSERVINFO = new EmbedBuilder()
					.setAuthor({
                        name: interaction.guild.name
                    })
					.setColor("Blurple")
					.setThumbnail(interaction.guild.iconURL())
					.addFields(
						{
							name: `Propriétaire`,
							value: `<@${owner.user.id}>`,
							inline: true
						},
						{
							name: `Date de création du serveur`,
							value: `<t:${Math.floor(interaction.guild.createdAt / 1000)}:d>`,
							inline: true
						},
						{
							name: `ID du serveur`,
							value: `${interaction.guild.id}`,
							inline: false
						},
						{
							name: `Nombre total de membres`,
							value: `${interaction.guild.memberCount}`,
							inline: true
						},
						{
							name: "Nombre de salons",
							value: `${interaction.guild.channels.cache.size}`,
							inline: true
						},
						{
							name: "Tickets",
							value: `**Ouverts** : ${openticketqty}\n**Pris en charge** : ${takenticketsqty}`,
							inline: true
						}
					);
				await interaction.reply({
                    embeds:[embedSERVINFO],
                    ephemeral: false
                });
			    break;

            case 'april':
				const uptime = moment.duration(client.uptime).format("\`D\` [days], \`H\` [hrs], \`m\` [mins], \`s\` [secs]");

                const embedBOTINFO = new EmbedBuilder()
                    .setAuthor({
                        name: "April"
                    })
                    .setColor("Blurple")
                    .setThumbnail(client.user.avatarURL({ size: 1024 }))
                    .setDescription("____________________________")
					.setFields([
						{
							name: "_____ \n\n│General",
							value: `_____`,
							inline: false,
						},
						{
							name: "🆔┆Id",
							value: `${client.user.id}`,
							inline: true,
						},
						{
							name: "💻┆Commandes",
							value: `\`${client.commands.size}\` commandes`,
							inline: true,
						},
						{
							name: "🔧┆Developpeur",
							value: `<@!697438073646088194>`,
							inline: true,
						},
						{
							name: "📅┆Créée",
							value: `<t:${Math.round(client.user.createdTimestamp / 1000)}>`,
							inline: true,
						},
						{
							name: "_____ \n\n│System",
							value: `_____`,
							inline: false,
						},
						{
							name: "🆙┆Uptime",
							value: `${uptime}`,
							inline: true,
						},
						{
							name: "⌛┆Latence API:",
							value: `\`${client.ws.ping}\`ms`,
							inline: true,
						},
						{
							name: "🏷┆Version du Bot",
							value: `\`${botversion}\``,
							inline: true,
						},
						{
							name: `🏷┆Version de ${process.versions.bun ? "Bun" : "Node.js"}`,
							value: `\`${process.versions.bun ? process.versions.bun : process.version}\``,
							inline: true,
						},
						{
							name: "📂┆Version de Discord.js",
							value: `\`${version}\``,
							inline: true,
						},
						{
							name: "💾┆RAM",
							value: `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}\` MB`,
							inline: true,
						},
					]);
                await interaction.reply({
                    embeds: [embedBOTINFO],
                    ephemeral: false
                });
                break;
        }
    }
};
