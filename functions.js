const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const { token, clientId, guildId, sequelizeCredentials } = require('./config.json');
const { Collection } = require('discord.js');
const fs = require('fs');
const rest = new REST({ version: '10' }).setToken(token);
const Sequelize = require('sequelize');



function deploy_commands(client, loadcommands) {
    if (typeof loadcommands !="boolean" && loadcommands != null) throw "loadcommands argument needs to be boolean or null";

    const commands = [];
    client.commands = new Collection();
    const commandCategories = fs.readdirSync('./commands').filter(file => !file.includes('.'));
    for (const category of commandCategories) {
        const commandFiles = fs.readdirSync(`./commands/${category}`).filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const command = require(`./commands/${category}/${file}`);
            commands.push(command.data);
            client.commands.set(command.data.name, command);

            console.log(`${category}/${command.data.name} chargé !`);
        }
    }
    if (loadcommands==true){
        slashCommandLoad(client, commands);
        console.log("Refreshed slash commands !");
    }
    else if(loadcommands==false){//Deletes slash commands
        slashCommandLoad(client, []);
        console.log("Deleted slash commands !");
    }
    else{
        console.log("Kept old commands");
    }
};


async function slashCommandLoad(client, commands) {
    try {
        console.log('Je commence à actualiser les commandes slash.');
        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands },
        );    
        console.log('Je viens de terminer de charger les commandes slash.');
    } catch (error) {
        console.error(error);
    }
    return client.commands;
};


function loadDatabase(client) {
    const sequelize = new Sequelize('database', sequelizeCredentials.username, sequelizeCredentials.password, {
        host: 'localhost',
        dialect: 'sqlite',
        logging: false,
        storage: 'database.sqlite',
    });
    const blacklistdb = sequelize.define('blacklist', {
        name: {//id
            type: Sequelize.STRING,
            unique: true,
        },
        username: Sequelize.STRING,
        reason: Sequelize.TEXT,
        timestamp: Sequelize.STRING,
        moderatorid: Sequelize.STRING
    });
    
    const modlog = sequelize.define('sanctions', {
        name: Sequelize.STRING,//id
        username: Sequelize.STRING,
        type: Sequelize.STRING,
        reason: Sequelize.TEXT,
        timestamp: Sequelize.STRING,
        moderatorid: Sequelize.STRING
    });
    
    const artists = sequelize.define('artists', {
        name: Sequelize.STRING,//id
        emoji: Sequelize.STRING,
    });
    
    client.database = {
        sequelize: sequelize,
        modlog: modlog,
        blacklistdb: blacklistdb,
        artists: artists,
    };
    blacklistdb.sync();
    modlog.sync();
    artists.sync();
}

module.exports = { deploy_commands, loadDatabase }
