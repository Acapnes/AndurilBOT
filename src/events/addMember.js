const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'guildMemberAdd',
    async execute(client) {
        console.log(client)
        let Embed = new MessageEmbed()
            .setTitle('Welcome to Fellowship! 👋')
            .setDescription(`${client.user.username}#${client.user.discriminator}`)
            .setThumbnail(client.user.displayAvatarURL({ format: "png", dynamic: true }))
            .setColor('RANDOM')
            .setFooter({ text: `Anduril BOT  🧙‍♂️` })
        client.guild.channels.cache.filter(channel => channel.type === 'GUILD_TEXT').find(channel => channel.position === 0 && channel.permissionsFor(client.guild.me).has('SEND_MESSAGES')).send({ embeds: [Embed] })
        // client.guild.channels.cache.get(process.env.WELCOME_CHANNEL_ID).send(`👋 Welcome! ${client.user}`);
    },
};