const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('getrole')
        .setDescription('Get a role from server!')
        .addRoleOption(option => option.setName('role').setDescription('Select a role').setRequired(true)),
    async execute(interaction) {
        const role = interaction.options.getRole('role');
        await interaction.member.roles.add(role)
            .then(async () => {
                await interaction.reply({ content: "Role added. 🥳" })
            }).catch(async (err) => {
                console.err("ROLE ERROR " + err)
                await interaction.reply({ content: "Something went wrong, please try again. 😔" })
            });
    },

}
