const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Get the avatar of a user')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user whose avatar you want to see')
                .setRequired(false)
        ),

    async execute(interaction) {
        const user = interaction.options.getUser('user') || interaction.user;

        const avatarEmbed = new EmbedBuilder()
            .setTitle(`🖼・User Avatar`)
            .setImage(user.displayAvatarURL({ dynamic: false, size: 1024 }))
            .setColor('#2f3136');

        await interaction.reply({ embeds: [avatarEmbed] });
    },
};
