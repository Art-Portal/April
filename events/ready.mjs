import { ActivityType }  from "discord.js";
import config from '../config.json' assert { type: 'json' };

export default {
	name: 'ready',
	once: true,
	async execute(client) {
        console.log("Prête")
        client.user.setStatus('online');
        
        let status_list = [
            "Mascotte de Art'Portal",
            "instagram.com/aprilartportal",
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
        client.user.setActivity({
            type: ActivityType.Custom,
            name: "custom_status",
            state: "Mascotte d'Art'Portal"
        });
            setInterval(() => {
                let Random = Math.floor(Math.random() * (status_list.length));
                let Random2 = Math.floor(Math.random() * (profilepictures_list.length));
                if(config.cycleStatuses){
                    client.user.setActivity({
                        type: ActivityType.Custom,
                        name: "custom_status",
                        state: status_list[Random]
                    });
                }
                if(config.cyclePfPs){
                    client.user.setAvatar(profilepictures_list[Random2]);
                }
            }, 300000);
    }
}
