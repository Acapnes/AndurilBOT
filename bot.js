const { Client, Collection, Interaction, Intents, ClientPresence } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
require("dotenv").config();
const fs = require('node:fs');
const path = require('node:path');
const { Player } = require("discord-player")

const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MEMBERS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_BANS,
		Intents.FLAGS.GUILD_INVITES,
		Intents.FLAGS.GUILD_INTEGRATIONS,
		Intents.FLAGS.GUILD_WEBHOOKS,
		Intents.FLAGS.DIRECT_MESSAGES,
		Intents.FLAGS.GUILD_VOICE_STATES,
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
client.player = new Player(client, {
	ytdlOptions: {
		quality: "highestaudio",
		highWaterMark: 1 << 25
	}
})

const commandsPath = path.join(__dirname, './src/commands');
const commandsFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandsFiles) {

	const filePath = path.join(commandsPath, file);
	const command = require(filePath);

	client.commands.set(command.data.name, command);
	commands.push(command.data.toJSON());
}

client.on("ready", (message) => {

	client.user.setActivity('LOTR', { type: 'WATCHING' });

	const guild_ids = client.guilds.cache.map(guild => guild.id);

	const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);
	for (const guildId of guild_ids) {

		rest.put(Routes.applicationGuildCommands(process.env.APP_ID, guildId),
			{ body: commands })
			.then(() => console.log("Commands updated for guild " + guildId))
			.catch(err => console.log(err));
	}


	const express = require("express")

	const app = express();

	app.set("view engine", "ejs")
	app.set('views', path.join(__dirname, './src/views'))

	app.get("/", (req, res) => {
		const avatar = client.user.avatarURL()
		const commands = client.commands.map(command => {
			return {
				name: command.data.name,
				value: command.data.description,
			}
		});

		res.status(200).render("index", { commands,avatar })
	})

	app.listen(3000 || 3001)
});

client.on("interactionCreate", async interaction => {

	async function handleCommand() {
		if (!interaction.isCommand()) return;

		const command = client.commands.get(interaction.commandName);

		if (!command) return;

		try {

			await command.execute(client, interaction);

		} catch (err) {
			console.log(err);
			await interaction.reply({ content: "There is an error" });
		}
	}

	handleCommand();
})


client.login(process.env.TOKEN);