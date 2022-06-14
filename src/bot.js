const { Client, Intents } = require('discord.js');
require("dotenv").config();

const client = new Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MEMBERS",
        "DIRECT_MESSAGE_REACTIONS"
    ],

});

const eventFiles = fs.readdirSync("./Events").filter(file => file.endsWith('.js'));



client.on('ready', () => {

    for (const file of eventFiles) {
        const filePath = path.join(eventsPath, file);
        const event = require(filePath);
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        } else {
            client.on(event.name, (...args) => event.execute(...args));
        }
    }


    console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", (message) => {
    if (message.content.startsWith("hi")) {
        message.channel.send("Hello");
    }
});

client.on("guildMemberAdd", (member,) => {
    member.guild.channels.cache.get("986312482471682128").send(`👋 Hoşgeldin! ${member}`)
    member.roles.add("986310579645984830");
});

client.login(process.env.TOKEN);