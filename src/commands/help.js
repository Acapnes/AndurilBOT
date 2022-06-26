const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Show bot commands."),
    async execute(client, interaction) {
        const commands = client.commands.map(command => {
            return {
                name: command.data.name.charAt(0).toUpperCase() + command.data.name.slice(1),
                value: command.data.description,
            }
        });

        let embedModal = new MessageEmbed()
            .setDescription("Help Screen")
            .addFields(commands)

        interaction.reply({ embeds: [embedModal] })
    }
}