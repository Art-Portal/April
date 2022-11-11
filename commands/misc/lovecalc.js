const { MessageEmbed, EmbedBuilder, SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('lovecalc')
    .setDescription('Pour calculer le pourcentage d\'amour avec April !')
    .addUserOption(option => option.setName('utilisateur')
    .setDescription('Utilisateur avec qui tester le lovecalc')
    .setRequired(false)),
    async execute(interaction) {
        try {
            let user = interaction.options.getUser('utilisateur');
            if (!user) user = interaction.user;

            loveuser = user.id.substring(0, 19);
            
            var love = Number(Number(String(String(loveuser).substring(17)).replace("0", "8").replace("1", "8")) * Number(String("858387628567298108".substring(17)).replace("0", "8").replace("1", "8")) + Number(Number(String(String(loveuser).substring(7, 8)).replace("0", "8").replace("1", "8")) + Number(String("858387628567298108".substring(7, 8)).replace("0", "8").replace("1", "8"))));

            let textlove = "";
            let image;
            if (loverates[user.id]){
                textlove = loverates[user.id][0];
                image = loverates[user.id][1] || null;
            }else if (love < 10) {
                textlove = `${love}% d'amitié avec ${user.username}?! MAMAN J'AI PEUR`;
                image = "https://media.discordapp.net/attachments/867491241491038209/970423542602678292/portalgirl-peur.png";
            }else if (love <= 20) {
                textlove = `${user.username} je t'apprécie à ${love}%, n'espère pas m'approcher !`;
                image = "https://media.discordapp.net/attachments/867491241491038209/970423539981234267/portalgirl-couteau.webp";
            }else if (love <= 50) {
                textlove = `${love}% d'amitié avec ${user.username}, ce n'est pas énorme ¯\_(ツ)_/¯`;
                image = "https://media.discordapp.net/attachments/867491241491038209/970423540635562035/portalgirl-dodo.webp";
            }else if (love <= 80) {
                textlove = `Toi ${user.username}, je t'apprécie à ${love}%, c'est pas mal nan ?`;
                image = "https://media.discordapp.net/attachments/867491241491038209/987466337095917568/AprilStyle-min.png";
            }else{
                if(love>100) love = 100
                textlove = `${love}% ! T'as l'air vachement sympa ${user.username} !`;
                image = "https://media.discordapp.net/attachments/867491241491038209/970423543626092604/portalgirl-wouah.webp";
            }

            var loveEmbed = new EmbedBuilder()
                .setColor('#ff00d0')
                .setTitle(textlove)
                .setImage(image)
                .setTimestamp();
            await interaction.reply({ embeds: [loveEmbed] });
        } catch (error) {
            console.error(error)
        }
    },
};

const loverates = {
    "697438073646088194": ["Je l'aime bien, lui, même si quand je le vois j'ai envie de poulet rôti je sais pas pourquoi", "https://media.discordapp.net/attachments/867491241491038209/1036987746457235526/april_sip.png"],//CoolMan
    "277136155244232706": ["Dawn ? HMMMMMMMMMMMM", "https://media.discordapp.net/attachments/867491241491038209/1036987746809548860/AprilThinking.png"],//Ced
    "718456289704804392": ["MAMAN JTM <333", "https://media.discordapp.net/attachments/867491241491038209/1036987744670457907/april_cat.png"],
    "397867150867693579": ["Il a des bons gouts musicaux lui", "https://cdn.discordapp.com/attachments/867491241491038209/1036988529248567306/AprilMusic.png"]
}