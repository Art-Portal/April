module.exports = {
    async execute(interaction) {
        await interaction.deferUpdate();
        await interaction.guild.roles.fetch();
        let currentrole;
        let member = interaction.member;
        switch(interaction.customId){
            case 'roleselect_color':
                for (let [key, value] of Object.entries(colors)) {
                    if (interaction.values[0].split("role_color_")[1] == key) {
                        currentrole = interaction.guild.roles.cache.find(role => role.id == value);
                        if (member.roles.cache.some(role => role.id == value)) {
                            member.roles.remove(currentrole);
                            await interaction.editReply({
                                content: `Vous avez bien été retiré.e du rôle <@&${value}>`
                            });
                        } else {
                            member.roles.add(currentrole);
                            await interaction.editReply({
                                content: `Vous avez bien reçu le rôle <@&${value}>`
                            });
                        }
                    }
                }
                break;
                
            case 'roleselect_genre':
                for (let [key, value] of Object.entries(genres)) {
                    if (interaction.values[0].split("role_genre_")[1] == key) {
                        currentrole = interaction.guild.roles.cache.find(role => role.id == value);
                        if (member.roles.cache.some(role => role.id == value)) {
                            member.roles.remove(currentrole);
                            await interaction.editReply({
                                content: `Vous avez bien été retiré.e du rôle <@&${value}>`
                            });
                        } else {
                            member.roles.add(currentrole);
                            await interaction.editReply({
                                content: `Vous avez bien reçu le rôle <@&${value}>`
                            });
                        }
                    }
                }
                break;
            case 'roleselect_hobbies':
                let hobbiesmessage="";
                for (let [key, value] of Object.entries(hobbies)) {
                    interaction.values.forEach( async (value2, index) => {
                        if (interaction.values[index].split("role_hobbies_")[1] == key){
                            currentrole = interaction.guild.roles.cache.find(role => role.id == value);
                            if (member.roles.cache.some(role => role.id == value)) {
                                member.roles.remove(currentrole);
                                hobbiesmessage = `${hobbiesmessage}\nVous avez bien été retiré.e du rôle <@&${value}>`;
                            } else {
                                member.roles.add(currentrole);
                                hobbiesmessage = `${hobbiesmessage}\nVous avez bien reçu le rôle <@&${value}>`;
                            }
                        }
                    });
                }
                interaction.editReply({ content: hobbiesmessage });
                break;
            case 'roleselect_pings':
                let pingmessage="";
                for (let [key, value] of Object.entries(pings)) {
                    interaction.values.forEach( async (value2, index) => {
                        if (interaction.values[index].split("role_ping_")[1] == key){
                            currentrole = interaction.guild.roles.cache.find(role => role.id == value);
                            if (member.roles.cache.some(role => role.id == value)) {
                                member.roles.remove(currentrole);
                                pingmessage = `${pingmessage}\nVous avez bien été retiré.e du rôle <@&${value}>`;
                            } else {
                                member.roles.add(currentrole);
                                pingmessage = `${pingmessage}\nVous avez bien reçu le rôle <@&${value}>`;
                            }
                        }
                    });
                }
                interaction.editReply({ content: pingmessage });
                break;
        }
    }
}

const colors = {
    "blue": "947485362610139196",
    "green": "947489800330559510",
    "orange": "947490189096415273",
    "red": "947490255311872000",
    "white": "947490339848060968",
    "yellow": "947490417245556796",
    "pink": "947496679580500008"
};

const genres = {
    "woman": "769918743626252318",
    "man": "768393897134784532",
    "other": "772041733278007307"
};

const hobbies = {
    "graphism": "949745563824431124",
    "music": "949746089987289128",
    "videogames": "949746175920181278",
    "mangascomics": "949746259898544229",
    "novels": "949746341754601502",
    "programming": "949746559019540511",
    "boardgame": "949746641764749324",
    "cooking": "949746678519439370"
};

const pings = {
    "announcements": "768396461763067914",
    "polls": "784646468958945280",
    "youtube": "774693756901392404",
    "events": "770568527156346880",
    "partnerships": "770723703948181525",
    "animations": "799249307362131978",
    "ecology": "847207140098572318",
    "insta": "955143137226010704"
};