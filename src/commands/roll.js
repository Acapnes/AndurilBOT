const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("roll")
        .setDescription("Roll dice.")
        .addIntegerOption(option => option.setName("start").setDescription("Starts with"))
        .addIntegerOption(option => option.setName("end").setDescription("Ends with")),
    async execute(client, interaction) {
        await interaction.reply("🧙‍♂️ " + String(Math.floor(Math.random() * (interaction.options.getInteger("end") || 10)) + (interaction.options.getInteger("start") || 0)))
    }
}