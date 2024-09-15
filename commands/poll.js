const { SlashCommandBuilder, EmbedBuilder, ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('poll')
    .setDescription('Starts an poll'),
    async execute(interaction, client) {
        if (interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            const modal = new ModalBuilder();
			modal.setCustomId('poll_modal');
			modal.setTitle('Umfrage Erstellen');
	
			const frage = new TextInputBuilder()
			.setCustomId('poll_modal__frage')
			.setLabel("Umfrage")
			.setStyle(TextInputStyle.Paragraph)
	
			const antwort1 = new TextInputBuilder()
			.setCustomId('poll_modal__antwort1')
			.setLabel("1. Antwort")
			.setStyle(TextInputStyle.Short)
	
			const antwort2 = new TextInputBuilder()
			.setCustomId('poll_modal__antwort2')
			.setLabel('2. Antwort')
			.setStyle(TextInputStyle.Short)

			const firstActionRow = new ActionRowBuilder().addComponents(frage);
			const secondActionRow = new ActionRowBuilder().addComponents(antwort1);
			const secondActionRow3 = new ActionRowBuilder().addComponents(antwort2);
	
			modal.addComponents(firstActionRow, secondActionRow, secondActionRow3);
	
			await interaction.showModal(modal);
        } else {
            return interaction.reply({ content: 'you dont have permissions to do that.', ephemeral: true })
            .catch((err) => {});
        }
    },
};