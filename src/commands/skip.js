const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("skip")
        .setDescription("Skip the current song."),
    async execute(client, interaction) {
        const queue = client.player.getQueue(interaction.guildId)

        if (!queue) return await interaction.reply("There are no songs in the queue")

        queue.skip()
        await interaction.reply({ content: "Skipped! 🧙‍♂️" });

    }
}