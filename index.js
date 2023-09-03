const fs = require('fs');
const { Client, GatewayIntentBits } = require("discord.js");
const { token } = require('./config.json');
const { deploy_commands, loadDatabase } = require('./functions.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildModeration,
		GatewayIntentBits.GuildMessages
    ]
});

loadDatabase(client)

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
}

deploy_commands(client, true);
/*
  true will refresh slash commands (SET endpoint)
  false will delete them (SET endpoint with an empty array)
  null will not change slash commands
*/


client.login(token);
