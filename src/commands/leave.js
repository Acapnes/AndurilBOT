const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("leave")
        .setDescription("Leave the channel."),
    async execute(client, interaction) {
        const queue = client.player.getQueue(interaction.guildId)

        if (!queue) return await interaction.reply("Something went wrong. 😕")

        queue.destroy()
        await interaction.reply({ content: "🌋", ephemeral: true });
    }
}