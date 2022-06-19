const { SlashCommandBuilder } = require("@discordjs/builders");


module.exports = {
    data: new SlashCommandBuilder()
        .setName("kick")
        .setDescription("Kick a member!")
        .addUserOption(option => option.setName("member").setDescription("Who will be kicked?").setRequired(true)),
    async execute(interaction) {

        if (!interaction.member.permissions.has("KICK_MEMBERS")) return interaction.reply({ content: "Not have enough permission for kick members.", ephemeral: true })

        const member = interaction.options.getMember("member")
        const user = interaction.options.getUser("member")

        await member.kick()
            .then(async () => {
                await interaction.reply(String(user) + " Has been kicked from server. 👾")
            }).catch(async (err) => {
                console.log("KICK ERROR " + err);
                await interaction.reply({ content: "Something went wrong, please try again. 😔" })
            });
    }
}