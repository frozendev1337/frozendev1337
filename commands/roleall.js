const { SlashCommandBuilder, EmbedBuilder, ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle, PermissionsBitField } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('roleall')
    .setDescription('gives a role to all members.')
    .addRoleOption(option => option.setName('role').setDescription('the role to lock in the current channel.').setRequired(true)),
    async execute(interaction, client) {
        const perms = PermissionsBitField.Flags;
        const role = interaction.options.getRole('role');
        const members = await interaction.guild.members.fetch();
        if (interaction.member.permissions.has(perms.ManageChannels) || interaction.member.permissions.has(perms.ManageChannels)) {
            let addRoles = 0;

            await interaction.reply({ content: 'adding roles...' }).catch((err) => {});

            setTimeout(async () => {
                members.filter(async (m) => !m.user.bot).forEach(async (member) => {
                    if (!member.roles.cache.has(role.id)) {
                        const Embed = new EmbedBuilder()
                        .setColor('#0097ff')
                        .setTitle('Adding Roles...')
                        .setDescription('Added <@&'+role.id+'> to '+addRoles+' Members.\n** **')
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
        
                        member.roles.add(role.id).catch((err) => {});
                        addRoles++;
    
                        await interaction.editReply({
                            embeds: [Embed],
                            content: '',
                            ephemeral: false,
                        }).catch((err) => {});
                    }
                });

                const Embed2 = new EmbedBuilder()
                    .setColor('#0097ff')
                    .setTitle('Added Roles')
                    .setDescription('Added Successfull <@&'+role.id+'> to '+addRoles+' Members.\n** **')
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

                    await interaction.editReply({
                        embeds: [Embed2],
                        content: '',
                        ephemeral: false,
                    }).catch((err) => {});
            }, 1000);
        } else {
            return interaction.reply({
                content: 'you dont have permissions to do that.',
                ephemeral: true
            }).catch((err) => {});
        }
    },
};