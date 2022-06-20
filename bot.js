const { Client, Collection, Interaction, Intents } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
require("dotenv").config();
const fs = require('node:fs');
const path = require('node:path');

const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.DIRECT_MESSAGES,
		Intents.FLAGS.GUILD_MEMBERS,
		Intents.FLAGS.GUILD_BANS,
	],

});

/// Event Files Imported

const eventsPath = path.join(__dirname, './src/events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	console.log(event.name + " event added.");
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

/// Commands Imported

const commands = [];
client.commands = new Collection();

const commandsPath = path.join(__dirname, './src/commands');
const commandsFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandsFiles) {

	const filePath = path.join(commandsPath, file);
	const command = require(filePath);

	client.commands.set(command.data.name, command);
	commands.push(command.data.toJSON());
}

client.on("ready", (message) => {

	const guild_ids = client.guilds.cache.map(guild => guild.id);

	const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);
	for (const guildId of guild_ids) {

		rest.put(Routes.applicationGuildCommands(process.env.APP_ID, guildId),
			{ body: commands })
			.then(() => console.log("Commands updated for guild " + guildId))
			.catch(err => console.log(err));
	}

	// console.log(message);
})

client.on("interactionCreate", async interaction => {

	async function handleCommand() {
		if (!interaction.isCommand()) return;

		const command = client.commands.get(interaction.commandName);

		if (!command) return;

		try {

			await command.execute(interaction);

		} catch (err) {
			console.log(err);
			await interaction.reply({ content: "There is an error" });
		}
	}

	handleCommand();
})


client.login(process.env.TOKEN);