module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
        console.log("Prête")
        client.user.setStatus('online');
        
        let status_list = [
            "être la mascotte de Art'Portal",
            "instagram.com/aprilartportal",
            "Art'Portal | discord.gg/graphisme",
            "Aprıl - Art'portal",
            ""
            ];
        let profilepictures_list = [
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
            ];
        client.user.setActivity("être la mascotte d' Art'Portal", { type: "PLAYING" });
            setInterval(() => {
                let Random = Math.floor(Math.random() * (status_list.length));
                let Random2 = Math.floor(Math.random() * (profilepictures_list.length));
                client.user.setActivity(status_list[Random], { type: "PLAYING" });
                client.user.setAvatar(profilepictures_list[Random2]);
            }, 300000);
    }
}