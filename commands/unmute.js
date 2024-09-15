const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('unmute')
    .setDescription('Unmute a user')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('The user to unmute')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('The reason for unmuting')
        .setRequired(false)),
  async execute(interaction) {
    const member = interaction.options.getMember('user');
    const reason = interaction.options.getString('reason') || 'No Reason';

    // Replace with your actual color code
    const successColor = '#00FF00'; // Green
    const errorColor = '#FF0000'; // Red

    // Check if user has required permissions
    if (!interaction.member.permissions.has(PermissionFlagsBits.ModerateMembers)) {
      return interaction.reply({
        embeds: [new EmbedBuilder()
          .setColor(errorColor)
          .setDescription(`🚫 | You must have \`Timeout Members\` permission to use this command.`)]
      });
    }

    // Check if bot has required permissions
    if (!interaction.guild.members.me.permissions.has(PermissionFlagsBits.ModerateMembers)) {
      return interaction.reply({
        embeds: [new EmbedBuilder()
          .setColor(errorColor)
          .setDescription(`🚫 | I must have \`Timeout Members\` permission to run this command.`)]
      });
    }

    // Check for invalid cases
    if (member.id === interaction.client.user.id) {
      return interaction.reply({
        embeds: [new EmbedBuilder()
          .setColor(errorColor)
          .setDescription(`🚫 | I cannot unmute myself.`)]
      });
    }

    if (interaction.member.id === member.id) {
      return interaction.reply({
        embeds: [new EmbedBuilder()
          .setColor(errorColor)
          .setDescription(`🚫 | You cannot unmute yourself.`)]
      });
    }

    // Check if member is not muted
    if (!member.isCommunicationDisabled()) {
      return interaction.reply({
        embeds: [new EmbedBuilder()
          .setColor(errorColor)
          .setDescription(`🚫 | This user is not muted.`)]
      });
    }

    // Unmute the member
    member.timeout(null, reason).then(() => {
      const unmuteEmbed = new EmbedBuilder()
        .setColor(successColor)
        .setDescription(`✅ | Successfully unmuted <@${member.id}>! | ${reason}`);
      const confirmationEmbed = new EmbedBuilder()
        .setColor(successColor)
        .setDescription(`✅ | Successfully unmuted in ${interaction.guild.name}! | ${reason}`);

      interaction.reply({ embeds: [confirmationEmbed] });

      member.send({ embeds: [unmuteEmbed] }).catch(() => {});
    }).catch(err => {
      console.error(err);
      interaction.reply({
        embeds: [new EmbedBuilder()
          .setColor(errorColor)
          .setDescription(`🚫 | An error occurred while trying to unmute the user.`)]
      });
    });
  },
};
