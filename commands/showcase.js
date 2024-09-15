const { SlashCommandBuilder, EmbedBuilder, ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle, PermissionsBitField } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('showcase')
    .setDescription('sends a showcase embed.')
    .addStringOption(option => option.setName('scriptname').setDescription('the name of the script').setRequired(true))
    .addStringOption(option => option.setName('video').setDescription('the showcase video url.').setRequired(true)),
    async execute(interaction, client) {
        if (interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            const scriptname = interaction.options.getString('scriptname');
            const video = interaction.options.getString('video');
            
            const string = `
            Showcase for __${scriptname}__

            Find the Showcase here __${video}__
            `;

            const Embed = new EmbedBuilder()
            .setAuthor({
                name: 'frozen.dev',
                iconURL: 'https://media.discordapp.net/attachments/1283213316600369183/1283889315914711050/547a2f684a6e7305f4aa063cf061f453.png?ex=66e4a29a&is=66e3511a&hm=05fd5f7689ed8f01718963bbcdfac7dfd27d7966d12231a4e84fbd0d458605b2&=&format=webp&quality=lossless',
                url: 'https://discord.com/invite/masora-dev',
            })
            .setColor('#0097ff')
            .setTitle('New Showcase')
            .setDescription(string)
            .setTimestamp()
            .setFooter({
                text: 'frozen.dev',
                iconURL: 'https://media.discordapp.net/attachments/1283213316600369183/1283889315914711050/547a2f684a6e7305f4aa063cf061f453.png?ex=66e4a29a&is=66e3511a&hm=05fd5f7689ed8f01718963bbcdfac7dfd27d7966d12231a4e84fbd0d458605b2&=&format=webp&quality=lossless',
            })

            return interaction.reply({
                embeds: [Embed],
                ephemeral: false,
            }).catch((err) => {});
        } else {
            return interaction.reply({
                content: 'you dont have permissions to do that.',
                ephemeral: true
            }).catch((err) => {});
        }
    },
};