const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("mute")
        .setDescription("Mute a member.")
        .addUserOption(option => option.setName('user').setDescription('Who will be muted?')),
    async execute(client, interaction) {
        if (!interaction.member.permissions.has("CREATE_INSTANT_INVITE")) return interaction.reply({ content: "Not have enough permission.", ephemeral: true });
    }
}