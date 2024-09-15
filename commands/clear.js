const { SlashCommandBuilder, EmbedBuilder, ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle, SlashCommandSubcommandBuilder, PermissionsBitField } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('deletes a custom message amount in this channel.')
    .addNumberOption(option => option.setName('amount').setDescription('the message amount').setRequired(true)),
    async execute(interaction, client) {
        let perms = PermissionsBitField.Flags;
        if (interaction.member.permissions.has(perms.Administrator) || interaction.member.permissions.has(perms.ManageMessages)) {
            const amount = interaction.options.getNumber('amount');
            let deleted = 0;
            (await interaction.channel.messages.fetch()).forEach(async (msg) => {
                if (deleted === amount || deleted > amount) {
                    return interaction.reply({
                        content: `i deleted ${deleted} messages in this channel.`,
                        ephemeral: true,
                    }).catch((err) => {});
                };
                msg.delete().catch((err) => {});
                deleted++;
            });
        } else {
            return interaction.reply({
                content: 'you dont have permissions to do that.',
                ephemeral: true
            }).catch((err) => {});
        }
    },
};