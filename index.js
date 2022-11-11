const fs = require('fs');
const Sequelize = require('sequelize');
const { Client, GatewayIntentBits } = require("discord.js");
const { token, sequelizeCredentials } = require('./config.json');
const { deploy_commands } = require('./functions.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildBans,
		GatewayIntentBits.GuildMessages
    ]
});

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

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
}

deploy_commands(client, true);//true: will refresh slash commands


client.login(token);