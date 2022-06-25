const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const { QueryType } = require("discord-player");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Give me some hints about this music')
        .addStringOption(option => option.setName("input").setDescription("Hint of music.").setRequired(true)),
    async execute(client, interaction) {
        if (!interaction.member.voice.channel) {
            return interaction.reply("You must be in a voice channel.")
        }

        let embedModal = new MessageEmbed()

        const queue = await client.player.createQueue(interaction.guild)
        if (!queue.connection) await queue.connect(interaction.member.voice.channel)

        let url = interaction.options.getString("input")
        const result = await client.player.search(url, {
            requestedBy: interaction.user,
            searchEngine: QueryType.AUTO
        })

        if (result.tracks.length === 0) {
            return interaction.reply("No results")
        }

        const song = result.tracks[0]
        await queue.addTrack(song)

        embedModal
            .setDescription(`**[${song.title}](${song.url})**`)
            .setThumbnail(song.thumbnail)
            .setFooter({ text: `Duration: ${song.duration}` })

        await interaction.reply({ content: "🧙‍♂️", embeds: [embedModal] })

        if (!queue.playing) await queue.play()
    }
}