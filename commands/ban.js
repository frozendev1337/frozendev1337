const { SlashCommandBuilder, EmbedBuilder, ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle, SlashCommandSubcommandBuilder, PermissionsBitField } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandSubcommandBuilder()
    .setName('ban')
    .setDescription('bans a member from this server.')
    .addUserOption(option => option.setName('user').setDescription('the user the will be banned.').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('the reason for the ban.').setRequired(false)),
    async execute(interaction, client) {
        if (interaction.member.permissions.has(PermissionsBitField.Flags.Administrator) || interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
            const user = interaction.options.getUser('user');
            const reason = interaction.options.getString('reason');
            const reason2 = reason || 'no reason';

            if (!interaction.guild.members.cache.get(user.id)) {
                return interaction.reply({
                    content: 'member not found!',
                    ephemeral: true,
                }).catch((err) => {});
            }

            if (interaction.guild.members.cache.get(user.id).permissions.has(PermissionsBitField.Flags.BanMembers)) {
                return interaction.reply({
                    content: 'you cant ban this person!',
                    ephemeral: true,
                }).catch((err) => {});
            }

            interaction.guild.members.cache.get(user.id).ban({
                reason: reason2,
            }).catch((err) => {
                return interaction.reply({
                    content: 'you cant ban this person!',
                    ephemeral: true,
                }).catch((err) => {});
            });
            
            return interaction.reply({
                content: 'banned <@' + user.id + '> successfull.',
                ephemeral: false
            }).catch((err) => {});
        } else {
            return interaction.reply({
                content: 'you dont have permissions to do that.',
                ephemeral: true
            }).catch((err) => {});
        }
    },
};