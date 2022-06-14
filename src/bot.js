const { Client, Intents } = require('discord.js');
require("dotenv").config();

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
    ],

});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", (message) => {
    if (message.content.startsWith("ping")) {
        message.channel.send("pong!");
    }
});

client.login(process.env.TOKEN);