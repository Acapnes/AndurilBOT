const { SlashCommandBuilder } = require("@discordjs/builders");


module.exports = {
    data: new SlashCommandBuilder()
        .setName("timeout")
        .setDescription("Timeout a member!")
        .addUserOption(option => option.setName("member").setDescription("Who will be kicked?").setRequired(true))
        .addNumberOption(option => option.setName('time').setDescription('Enter the time in minutes.').setRequired(true)),
    async execute(interaction) {

        if (!interaction.member.permissions.has("TIMEOUT_MEMBERS")) return interaction.reply({ content: "Not have enough permission for kick members.", ephemeral: true });

        await interaction.options.getMember("member").timeout(interaction.options.getNumber("time") * 1000 * 60)
            .then(async () => {
                await interaction.reply(String(interaction.options.getUser("member")) + " Has been timed out. 👾 \nTime: " + interaction.options.getNumber("time") + " munites 👾")
            }).catch(async (err) => {
                console.log("TIMEOUT ERROR " + err);
                await interaction.reply({ content: "Something went wrong, please try again. 😔" })
            });
    }
}