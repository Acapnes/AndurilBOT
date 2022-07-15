const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'guildCreate',
    async execute(client) {
        let Embed = new MessageEmbed()
            .setTitle('Anduril Bot Sword of Elendil is ready!')
            .setColor('GREY')
            .setFooter({ text: `Anduril BOT` })
        client.channels.cache.filter(channel => channel.type === 'GUILD_TEXT').find(channel => channel.position === 0 && channel.permissionsFor(client.me).has('SEND_MESSAGES')).send({ embeds: [Embed] })
    },
};


