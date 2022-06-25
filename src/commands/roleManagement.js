const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roles')
        .setDescription('Get a role from server!')
        .addSubcommand(subcommand =>
            subcommand
                .setName('addrole')
                .setDescription('Add role to user')
                .addRoleOption(option => option.setName('role').setDescription('Select a role').setRequired(true))
                .addUserOption(option => option.setName('user').setDescription('Select a user').setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('removerole')
                .setDescription('Remove a role from user')
                .addRoleOption(option => option.setName('role').setDescription('Select a role').setRequired(true))
                .addUserOption(option => option.setName('user').setDescription('Select a user').setRequired(true))),
    async execute(client,interaction) {

        if (interaction.options.getSubcommand() === 'addrole') {

            await interaction.options.getMember('user').roles.add(interaction.options.getRole('role'))
                .then(async () => {
                    await interaction.reply({ content: "Role added. 🥳" })
                }).catch(async (err) => {
                    console.err("ROLE ERROR " + err)
                    await interaction.reply({ content: "Something went wrong, please try again. 😔" })
                });

        } else {

            await interaction.options.getMember('user').roles.remove(interaction.options.getRole('role'))
                .then(async () => {
                    await interaction.reply({ content: "Role removed. 😬" })
                }).catch(async (err) => {
                    console.err("ROLE ERROR " + err)
                    await interaction.reply({ content: "Something went wrong, please try again. 😔" })
                });

        }

    },

}
