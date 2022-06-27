const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Shows user avatar.')
        .addUserOption(option => option.setName("user").setDescription("Select user.").setRequired(true)),
    async execute(client, interaction) {

        console.log(interaction.user)

        let embedModal = new MessageEmbed()
            .setAuthor({ name: interaction.options.getUser("user").username + "#" + interaction.options.getUser("user").discriminator, iconURL: interaction.options.getUser("user").displayAvatarURL({ format: "png" }) })
            .setDescription(`[Avatar Link](${interaction.options.getUser("user").avatarURL()})`)
            .setImage(interaction.options.getUser("user").displayAvatarURL({ format: "png", size: 4096, dynamic: true }))
            .setFooter({ text: `Request by ${interaction.user.username}#${interaction.user.discriminator}`, iconURL: interaction.user.displayAvatarURL({ format: "png" }) })

        interaction.reply({ embeds: [embedModal] })
    }
}