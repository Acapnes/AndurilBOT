const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'guildCreate',
    async execute(client) {
        await client.guild.cache.forEach(async guild => {
            let Embed = new MessageEmbed()
                .setTitle(client.user.username)
                .setDescription(`Sword of Elendil is ready!`)
                .setColor('GREY')
            await guild.channels.cache.filter(channel => channel.type === 'GUILD_TEXT').find(channel => channel.position === 0 && channel.permissionsFor(guild.me).has('SEND_MESSAGES')).send({ embeds: [Embed] })
        });
        console.log(`New Guild Created!!`);
    },
};


