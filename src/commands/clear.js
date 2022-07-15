const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("clear")
        .setDescription("Clear messages from channel.")
        .addChannelOption(option => option.setName('channel').setDescription('Select a channel.'))
        .addIntegerOption(option => option.setName('number').setDescription('How much messages will be deleted?')),
    async execute(client, interaction) {

        if (!interaction.member.permissions.has("MESSAGES" && "MANAGE_CHANNELS")) return interaction.reply({ content: "Not have enough permission.", ephemeral: true });

        await interaction.options.getChannel('channel') ? interaction.options.getChannel('channel').bulkDelete(interaction.options.getInteger('number') ? interaction.options.getInteger('number') : 10, true)
            .then(async () => {
                await interaction.reply({ content: "Messages Deleted!", ephemeral: true })
            })
            .catch(async (err) => {
                console.log("Clear Error: " + err)
                interaction.reply({ content: "Something went wrong 😕", ephemeral: true })

            }) : interaction.channel.bulkDelete(interaction.options.getInteger('number') ? interaction.options.getInteger('number') : 10, true)
                .then(async () => {
                    await interaction.reply({ content: "Messages Deleted! 🧙‍♂️", ephemeral: true })
                })
                .catch(async (err) => {
                    console.log("Clear Error: " + err)
                    interaction.reply({ content: "Something went wrong 😕", ephemeral: true })
                })

    }
}