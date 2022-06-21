module.exports = {
    name: 'guildMemberAdd',
    async execute(client) {
        client.guild.channels.cache.get(process.env.WELCOME_CHANNEL_ID).send(`👋 Welcome! ${client.user}`);
    },
};