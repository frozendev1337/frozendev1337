const { SlashCommandBuilder, EmbedBuilder, ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle, PermissionsBitField } = require('discord.js');
const fs = require('fs');
const request = require('request');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('mute')
    .setDescription('mutes a member.')
    .addUserOption(option => option.setName('user').setDescription('the member to mute').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('the reason for the mute').setRequired(false)),
    async execute(interaction, client) {
        if (interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
            const member = interaction.options.getUser('user');
            const user = interaction.guild.members.cache.get(member.id);
            const reason = interaction.options.getString('reason') || 'no reason';

            user.roles.add('1230302863394340895').catch((err) => {});

            return interaction.reply({
                content: `muted <@${member.id}> successfull. reason: ` + "`" + `${reason}` + "`" + "",
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