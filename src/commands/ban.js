const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {

    data: new SlashCommandBuilder()
        .setName("ban")
        .setDescription("Ban a member.")
        .addUserOption(option => option.setName("member").setDescription("Who will be banned?").setRequired(true))
        .addNumberOption(option => option.setName("days").setDescription("Ban time as days?").setRequired(false))
        .addStringOption(option => option.setName("reason").setDescription("Reason to ban").setRequired(false)),
    async execute(client, interaction) {

        if (!interaction.member.permissions.has("BAN_MEMBERS")) return interaction.reply({ content: "You have not permission.", ephemeral: true })

        await interaction.options.getMember("member").ban({ days: interaction.options.getNumber("days") || "1", reason: interaction.options.getString("reason") })
            .then(async () => {

                await interaction.reply(String(interaction.options.getUser("member")) + " Has been banned from server. 🧙‍♂️")
            })
            .catch(async (err) => {
                console.log("BAN ERROR " + err)
                await interaction.reply({ content: "Something went wrong. 😕", ephemeral: true })
            })
    }


}