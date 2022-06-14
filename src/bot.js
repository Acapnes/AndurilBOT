const { Client, Intents } = require('discord.js');
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.GUILDS_v
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

client.login('OTU1NzI2NjYzODI2NjgxODY3.Gt5ztl.RLQq28OqNCDm7RNTnaDszygWmoETuZISOslWe0');