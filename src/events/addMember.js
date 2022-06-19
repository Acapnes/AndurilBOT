module.exports = {
    name: 'guildMemberAdd',
    async execute(client) {
        client.guild.channels.cache.get("986312482471682128").send(`👋 Welcome! ${client.user}`);
    },
};