const { SlashCommandBuilder } = require("@discordjs/builders");
const { joinVoiceChannel, createAudioResource, StreamType } = require('@discordjs/voice');
const { createAudioPlayer } = require('@discordjs/voice');
const ytdl = require('ytdl-core');
const { generateDependencyReport } = require('@discordjs/voice');



module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Plays a music with Youtube URL.'),
    // .addStringOption(option => option.setName("input").setDescription("Youtube URL").setRequired(true)),
    async execute(client, interaction) {

        console.log("Client " + client);
        console.log("Interaction " + interaction)
        // const connection = joinVoiceChannel({
        //     channelId: "955751913503207509",
        //     guildId: process.env.GUILD_ID,
        //     adapterCreator: interaction.guild.voiceAdapterCreator,
        // });

        // var stream = await ytdl("https://youtu.be/gIYq6ydpYwA", {
        //     highWaterMark: 1 << 25,
        //     filter: "audioonly"
        // });

        // const player = createAudioPlayer();
        // const resource = createAudioResource(stream, { inputType: StreamType.Opus });

        // connection.subscribe(player);
        // player.play(resource);
    }
}