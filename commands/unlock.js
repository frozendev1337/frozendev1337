const { SlashCommandBuilder, EmbedBuilder, ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle, PermissionsBitField } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('unlock')
    .setDescription('unlocks the current channel.')
    .addRoleOption(option => option.setName('role').setDescription('the role to unlock in the current channel.').setRequired(true)),
    async execute(interaction, client) {
        const role = interaction.options.getRole('role');
        const perms = PermissionsBitField.Flags;
        if (interaction.member.permissions.has(perms.ManageChannels) || interaction.member.permissions.has(perms.ManageChannels)) {
            interaction.channel.permissionOverwrites.edit(role.id, {
                SendMessages: true,
            }).catch((err) => {}).then(() => {
                const Embed = new EmbedBuilder()
                .setColor('#0097ff')
                .setTitle('Channel Unlocked')
                .setDescription('This channel got unlocked by <@' + interaction.member.id + '>.\n** **')
                .addFields(
                    {
                        name: 'Role',
                        value: `<@&${role.id}>`,
                        inline: true
                    },
                    {
                        name: 'Moderator',
                        value: `<@${interaction.member.id}>`,
                        inline: true
                    }
                )
                .setTimestamp()
                .setFooter({
                    text: 'frozen.dev',
                    iconURL: 'https://media.discordapp.net/attachments/1209188549815959572/1283990050073219142/88e282ff5742e16142711739058393ec.jpg?ex=66e5006b&is=66e3aeeb&hm=e9870290d3a69dc2c81063544c9565c284ebc235daef1b436eaae242f9c5b54d&=&format=webp&width=547&height=671',
                })

                return interaction.reply({
                    embeds: [Embed],
                    ephemeral: false,
                }).catch((err) => {});
            });
        } else {
            return interaction.reply({
                content: 'you dont have permissions to do that.',
                ephemeral: true
            }).catch((err) => {});
        }
    },
};