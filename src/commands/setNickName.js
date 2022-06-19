const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setname')
        .setDescription('Changes your Nickname in this server!')
        .addStringOption(option => option.setName('nickname').setDescription('Enter a nickname')),
    async execute(interaction) {
        await interaction.member.setNickname(interaction.options.getString('nickname')) 
            .then(async () => {
                await interaction.reply({ content: "Your nickname has been changed. 😉" });
            })
            .catch(async (err) => {
                await interaction.reply({ content: "Something went wrong. 😕" });
            })
    },
};