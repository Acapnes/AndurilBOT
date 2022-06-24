const { SlashCommandBuilder } = require("@discordjs/builders");
const { KickLogger } = require("../helpers/logger");


module.exports = {
    data: new SlashCommandBuilder()
        .setName("kick")
        .setDescription("Kick a member!")
        .addUserOption(option => option.setName("member").setDescription("Who will be kicked?").setRequired(true))
        .addStringOption(option => option.setName("reason").setDescription("Reason for kick").setRequired(false)),
    async execute(interaction) {

        if (!interaction.member.permissions.has("KICK_MEMBERS")) return interaction.reply({ content: "Not have enough permission for kick members.", ephemeral: true })

        await interaction.options.getMember("member").kick(interaction.options.getString("reason"))
            .then(async () => {
                KickLogger(interaction.options.getMember("member").user.id, interaction.options.getMember("member").user.username, interaction.options.getString("reason"));
                await interaction.reply(String(interaction.options.getUser("member")) + " Has been kicked from server. 🧙‍♂️ \nReason: " + interaction.options.getString("reason") + " 🧙‍♂️")
            }).catch(async (err) => {
                console.log("KICK ERROR " + err);
                await interaction.reply({ content: "Something went wrong, please try again. 😔" })
            });
    }
}