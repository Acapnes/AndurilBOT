const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("invite")
        .setDescription("Create invite to channel.")
        .addChannelOption(option => option.setName('channel').setDescription('Select a channel.')),
    async execute(client, interaction) {
        if (!interaction.member.permissions.has("CREATE_INSTANT_INVITE")) return interaction.reply({ content: "Not have enough permission.", ephemeral: true });

        await interaction.options.getChannel('channel') ? interaction.options.getChannel('channel').createInvite()
            .then(invite => {
                interaction.reply(`https://discord.gg/${invite.code}  🧙‍♂️`)
            })
            .catch(err => {
                console.log("Invite create Error: " + err)
                interaction.reply({ content: "Something went wrong 😕", ephemeral: true })

            }) : interaction.channel.createInvite()
                .then(invite => {
                    interaction.reply(`https://discord.gg/${invite.code}  🧙‍♂️`)
                })
                .catch(err => {
                    console.log("Invite create Error: " + err)
                    interaction.reply({ content: "Something went wrong 😕", ephemeral: true })

                })
    }
}