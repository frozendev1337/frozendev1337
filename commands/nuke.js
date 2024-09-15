const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('nuke')
        .setDescription('Nuke a channel')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageChannels)
        .setDMPermission(false),

    async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
            let errorEmbed = new EmbedBuilder()
                .setColor('#FF0000') 
                .setDescription('You must have `Manage Channels` permission to use this command.');
            return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }

        try {
            let row = new ActionRowBuilder().addComponents(
                new ButtonBuilder().setCustomId('YES').setStyle(ButtonStyle.Success).setLabel('Yes'),
                new ButtonBuilder().setCustomId('NO').setStyle(ButtonStyle.Danger).setLabel('No')
            );

            const embed = new EmbedBuilder()
                .setColor('#FFFF00')
                .setDescription('Are you sure you want to nuke this channel?');

            await interaction.reply({ embeds: [embed], components: [row] });

            const filter = (buttonInteraction) => buttonInteraction.user.id === interaction.user.id;
            const collector = interaction.channel.createMessageComponentCollector({
                filter,
                max: 1,
                time: 15000,
            });

            collector.on('collect', async (buttonInteraction) => {
                const id = buttonInteraction.customId;

                if (id === 'YES') {
                    interaction.channel.clone().then((ch) => {
                        let successEmbed = new EmbedBuilder()
                            .setTitle('**Channel Successfully Nuked**')
                            .setColor('#00FF00');

                        ch.setParent(interaction.channel.parent);
                        ch.setPosition(interaction.channel.position);

                        interaction.channel.delete().then(() => {
                            ch.send({ embeds: [successEmbed] }).then((msg) => {
                                setTimeout(() => msg.delete(), 30000);
                            });
                        });
                    });
                } else if (id === 'NO') {
                    await buttonInteraction.update({ content: 'Nuke cancelled.', components: [] });
                }
            });

            collector.on('end', collected => {
                if (collected.size === 0) {
                    interaction.editReply({ content: 'No response. Nuke cancelled.', components: [] });
                }
            });
        } catch (err) {
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor('#FF0000') 
                        .setDescription('I was unable to nuke this channel.')
                ],
                ephemeral: true,
            });
        }
    },
};
