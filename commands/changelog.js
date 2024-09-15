const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('changelogs')
        .setDescription('Displays the changelogs of the bot'),

    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setTitle('📃・Changelogs')
            .setDescription('_____')
            .setThumbnail(interaction.client.user.avatarURL({ size: 1024 }))
            .addFields({
                name: '📃┆Changelogs',
                value: '13/9/2024 Updated dependencies',
                inline: false,
            })
            .setColor('#2f3136'); 

        await interaction.reply({ embeds: [embed] });
    },
};
