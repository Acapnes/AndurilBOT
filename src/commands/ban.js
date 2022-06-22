const { SlashCommandBuilder } = require('@discordjs/builders');
const { BanLogger } = require('../helpers/logger');
const { execute } = require('./setNickName');

module.exports = {

    data: new SlashCommandBuilder()
        .setName("ban")
        .setDescription("Ban a member.")
        .addUserOption(option => option.setName("member").setDescription("Who will be banned?").setRequired(true))
        .addNumberOption(option => option.setName("days").setDescription("Ban time as days?").setRequired(false))
        .addStringOption(option => option.setName("reason").setDescription("Reason to ban").setRequired(false)),
    async execute(interaction) {

        if (!interaction.member.permissions.has("BAN_MEMBERS")) return interaction.reply({ content: "You have not permission.", ephemeral: true })

        await interaction.options.getMember("member").ban({ days: interaction.options.getNumber("days") || "1", reason: interaction.options.getString("reason") })
            .then(async () => {

                BanLogger(
                    interaction.options.getMember("member").user.id,
                    interaction.options.getMember("member").user.username,
                    interaction.options.getNumber("days"),
                    interaction.options.getString("reason")
                );

                await interaction.reply(String(interaction.options.getUser("member")) + " Has been banned from server. 👽")
            })
            .catch(async (err) => {
                console.log("BAN ERROR " + err)
                await interaction.reply({ content: "Something went wrong. 😕", ephemeral: true })
            })
    }


}