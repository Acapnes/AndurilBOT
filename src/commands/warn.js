const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("warn")
        .setDescription("Message the member directly for an warn.")
        .addUserOption(option => option.setName('user').setDescription('Who will be warned?'))
        .addStringOption(option => option.setName('reason').setDescription('Description for reason.')),
    async execute(client, interaction) {

        if (!interaction.member.permissions.has(["SEND_MESSAGES", "MODERATE_MEMBERS"])) return interaction.reply({ content: "Not have enough permission.", ephemeral: true });


        let Embed = new MessageEmbed()
            .setTitle('<:interrobang:996809954482733056> You were warned!')
            .setImage('https://i.kym-cdn.com/entries/icons/facebook/000/002/144/You_Shall_Not_Pass!_0-1_screenshot.jpg')
            .setDescription(interaction.options.getString('reason'))
            .setColor('RED')
            .setFooter({ text: `From ${interaction.member.guild.name} • ${interaction.user.username}#${interaction.user.discriminator}`, iconURL: interaction.user.displayAvatarURL({ format: "png" }) })

        await interaction.options.getMember('user').send({ embeds: [Embed] })
            .then(async () => {
                interaction.reply({ content: String(interaction.options.getUser("user")) + " has been warned. ✌️" })
            }).catch(async err => {
                console.log("Warn err: " + err)
                interaction.reply({ content: "Something went wrong.", ephemeral: true })
            });
    }
}