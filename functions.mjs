import { REST }  from "@discordjs/rest";
import { Routes }  from "discord-api-types/v10";
import { Collection, WebhookClient, EmbedBuilder, Client }  from 'discord.js';
import { inspect }  from "util";
import fs  from "fs";
import Sequelize  from "sequelize";

import config from './config.json' assert { type: 'json' };
const { token, clientId, guildId, sequelizeCredentials, errorWebhookURL } = config;


const rest = new REST({ version: '10' }).setToken(token);




async function deploy_commands(client, loadcommands) {
    if (typeof loadcommands !="boolean" && loadcommands != null) throw "loadcommands argument needs to be boolean or null";

    const commands = [];
    client.commands = new Collection();
    const commandCategories = fs.readdirSync('./commands').filter(file => !file.includes('.'));
    console.log(`Loading ${commandCategories.toString()} commands...`)
    for (const category of commandCategories) {
        const commandFiles = fs.readdirSync(`./commands/${category}`).filter(file => file.endsWith('.mjs'));
        console.log(`Loading ${commandFiles.toString()}...`)
        for (const file of commandFiles) {
            const { default: command } = await import(`./commands/${category}/${file}`);
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
    console.log("Starting to load database...")
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
    console.log("Database loaded !")
}

function loadErrorCatcher(client) {
    console.log("Loading error catcher...")
    client.errorCatcherWebhook = new WebhookClient({
        url: errorWebhookURL,
    });

    process.on("unhandledRejection", (reason, promise) => {
        console.log(reason, "\n", promise);

        const errorEmbed = new EmbedBuilder()
            .setColor("Red")
            .setTitle("Unhandled Rejection/Catch")
            .setURL("https://nodejs.org/api/process.html#event-unhandledrejection")
            .addFields(
                {
                    name: "Reason",
                    value: `\`\`\`${inspect(reason, { depth: 0 }).slice(0, 1000)}\`\`\``,
                },
                {
                    name: "Promise",
                    value: `\`\`\`${inspect(promise, { depth: 0 }).slice(0, 1000)}\`\`\``,
                }
            )
        .setTimestamp();

        return client.errorCatcherWebhook.send({ embeds: [errorEmbed] });
    });

    process.on("uncaughtException", (err, origin) => {
        console.log(err, "\n", origin);

        const errorEmbed = new EmbedBuilder()
            .setColor("Red")
            .setTitle("Uncaught Exception/Catch")
            .setURL("https://nodejs.org/api/process.html#event-uncaughtexception")
            .addFields(
                {
                    name: "Error",
                    value: `\`\`\`${inspect(err, { depth: 0 }).slice(0, 1000)}\`\`\``,
                },
                {
                    name: "Origin",
                    value: `\`\`\`${inspect(origin, { depth: 0 }).slice(0, 1000)}\`\`\``,
                }
            )
        .setTimestamp();

        return client.errorCatcherWebhook.send({ embeds: [errorEmbed] });
    });

    process.on("uncaughtExceptionMonitor", (err, origin) => {
        console.log(err, "\n", origin);

        const errorEmbed = new EmbedBuilder()
            .setColor("Red")
            .setTitle("Uncaught Exception Monitor")
            .setURL(
                "https://nodejs.org/api/process.html#event-uncaughtexceptionmonitor"
            )
            .addFields(
                {
                    name: "Error",
                    value: `\`\`\`${inspect(err, { depth: 0 }).slice(0, 1000)}\`\`\``,
                },
                {
                    name: "Origin",
                    value: `\`\`\`${inspect(origin, { depth: 0 }).slice(0, 1000)}\`\`\``,
                }
            )
            .setTimestamp();

        return client.errorCatcherWebhook.send({ embeds: [errorEmbed] });
    });

    process.on("warning", (warn) => {
        console.log(warn);

        const errorEmbed = new EmbedBuilder()
            .setColor("Red")
            .setTitle("Uncaught Exception Monitor Warning")
            .setURL("https://nodejs.org/api/process.html#event-warning")
            .addFields({
                name: "Warning",
                value: `\`\`\`${inspect(warn, { depth: 0 }).slice(0, 1000)}\`\`\``,
            })
            .setTimestamp();

        return client.errorCatcherWebhook.send({ embeds: [errorEmbed] });
    });

    console.log("Error catcher loaded !")
}

export { deploy_commands, loadDatabase, loadErrorCatcher }
