const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const { token, clientId, guildId } = require('./config.json');
const { Collection, SlashCommandBuilder } = require('discord.js')
const { isBoolean } = require('util')
const fs = require('fs');
const rest = new REST({ version: '10' }).setToken(token);



function deploy_commands(client, loadcommands) {
    if (!isBoolean(loadcommands)) throw "type of loadcommands argument needs to be boolean";

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
    if (loadcommands){
        slashCommandLoad(client, commands);
    }
    else{//Deletes slash commands
        slashCommandLoad(client, [])
    }
}

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

module.exports = { deploy_commands }