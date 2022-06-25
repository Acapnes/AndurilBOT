const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setnickname')
        .setDescription('Changes your Nickname in this server!')
        .addStringOption(option => option.setName('nickname').setDescription('Enter a nickname').setRequired(true)),
    async execute(client,interaction) {

        if (!interaction.member.permissions.has("CHANGE_NICKNAME")) return interaction.reply({ content: "Not have enough permission.", ephemeral: true });

        await interaction.member.setNickname(interaction.options.getString('nickname'))
            .then(async () => {
                await interaction.reply({ content: "Your nickname has been changed. 😉" });
            })
            .catch(async (err) => {
                await interaction.reply({ content: "Something went wrong. 😕" });
            })
    },
};