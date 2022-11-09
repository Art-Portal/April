const { EmbedBuilder } = require('discord.js');

module.exports = {
    async execute(interaction){
        await interaction.update({ embeds:[
            new EmbedBuilder(interaction.message.embeds[0])
                .setImage(images[interaction.customId][Number(interaction.values[0])])
                .setFooter({ text: `Page ${Number(interaction.values[0])+1}/${images[interaction.customId].length}` })
        ] })
    }
}

const images = {
    document_sanctions: [
        "https://media.discordapp.net/attachments/867491241491038209/992161245560057906/Bareme_des_sanctions-1.png",
        "https://media.discordapp.net/attachments/867491241491038209/992161245883011103/Bareme_des_sanctions-2.png",
        "https://media.discordapp.net/attachments/867491241491038209/992161246214373416/Bareme_des_sanctions-3.png",
        "https://media.discordapp.net/attachments/867491241491038209/992161246424092765/Bareme_des_sanctions-4.png",
        "https://media.discordapp.net/attachments/867491241491038209/992161246646374580/Bareme_des_sanctions-5.png",
        "https://media.discordapp.net/attachments/867491241491038209/992161246914805831/Bareme_des_sanctions-6.png",
        "https://media.discordapp.net/attachments/867491241491038209/992161247250370682/Bareme_des_sanctions-7.png"
        ],
    document_albumphoto: [
        "https://media.discordapp.net/attachments/867491241491038209/970423539696009247/portalgirl-cool.png",
        "https://media.discordapp.net/attachments/867491241491038209/970423539981234267/portalgirl-couteau.webp",
        "https://media.discordapp.net/attachments/867491241491038209/970423540635562035/portalgirl-dodo.webp",
        "https://media.discordapp.net/attachments/867491241491038209/970423542057406524/portalgirl-mais.webp",
        "https://media.discordapp.net/attachments/867491241491038209/970423542602678292/portalgirl-peur.png",
        "https://media.discordapp.net/attachments/867491241491038209/970423542892097537/portalgirl-sueur.png",
        "https://media.discordapp.net/attachments/867491241491038209/970423543189872690/portalgirl-triste.webp",
        "https://media.discordapp.net/attachments/867491241491038209/970423543626092604/portalgirl-wouah.webp",
        "https://media.discordapp.net/attachments/867491241491038209/987292546180984832/april-welcome.png",
        "https://media.discordapp.net/attachments/867491241491038209/987466337095917568/AprilStyle-min.png"
        ]
};