const { SlashCommandBuilder, EmbedBuilder, ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle } = require('discord.js');
const fs = require('fs');
const request = require('request');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('status')
    .setDescription('sends our current status.'),
    async execute(interaction, client) {
        let string = `
        Here is our Current Status

        [ %%🟢%% ] Discord Bot
        [ %%🟠%% ] Panel
        [ %%🟢%% ] Obfuscators
        [ %%🔴%% ] License System

        %%🟢%% = Online
        %%🟠%% = Maintance
        %%🔴%% = Offline
        `;

        const Embed = new EmbedBuilder()
        .setAuthor({
            name: 'frozen.dev',
            iconURL: 'https://media.discordapp.net/attachments/1209188549815959572/1283990050073219142/88e282ff5742e16142711739058393ec.jpg?ex=66e5006b&is=66e3aeeb&hm=e9870290d3a69dc2c81063544c9565c284ebc235daef1b436eaae242f9c5b54d&=&format=webp&width=547&height=671',
            url: 'https://frozen.dev',
        })
        .setColor('#0097ff')
        .setTitle('Current Status')
        .setTimestamp()
        .setURL('https://frozen.dev')
        .setFooter({
            text: 'frozen.dev',
            iconURL: 'https://media.discordapp.net/attachments/1209188549815959572/1283990050073219142/88e282ff5742e16142711739058393ec.jpg?ex=66e5006b&is=66e3aeeb&hm=e9870290d3a69dc2c81063544c9565c284ebc235daef1b436eaae242f9c5b54d&=&format=webp&width=547&height=671',
        })
        .setDescription(string.replace(/\[%%(.*?)%%\]/g, '[$1]').replace(/%%/g, '`'))

        return interaction.reply({
            embeds: [Embed],
            ephemeral: false,
        }).catch((err) => {});
    },
};