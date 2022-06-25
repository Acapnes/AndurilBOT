const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("unban")
        .setDescription("Unban a user")
        .addStringOption(option => option.setName("input").setDescription("Enter a input as userid or username").setRequired(true)),
    async execute(client,interaction) {

        if (!interaction.member.permissions.has("BAN_MEMBERS")) return interaction.reply({ content: "You have not permission.", ephemeral: true })

    }
}