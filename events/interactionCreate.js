const { Interaction, EmbedBuilder } = require("discord.js");

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (!interaction.isCommand()) {
            handle(interaction);
            return
        }

        const command = client.commands.get(interaction.commandName);
        if (!command) return
        try{
            await command.execute(interaction, client);
        } catch (error) {
            console.log(error);
            await interaction.reply({
                content: '❌ Ein Fehler ist Aufgetreten!', 
                ephemeral: true
            });
        } 
    },
};

function handle(interaction) {
    switch (interaction.customId) {
        case "poll_modal":
            const frage = interaction.fields.getTextInputValue('poll_modal__frage');
            const antwort1 = interaction.fields.getTextInputValue('poll_modal__antwort1');
            const antwort2 = interaction.fields.getTextInputValue('poll_modal__antwort2');
    
            const Embed = new EmbedBuilder()
            .setAuthor({
                name:'frozen.dev',
                iconURL:'https://media.discordapp.net/attachments/1209188549815959572/1283990050073219142/88e282ff5742e16142711739058393ec.jpg?ex=66e5006b&is=66e3aeeb&hm=e9870290d3a69dc2c81063544c9565c284ebc235daef1b436eaae242f9c5b54d&=&format=webp&width=547&height=671'
            })
            .setColor('#0097ff')
            .setTimestamp()
            .setTitle('Poll Started!')
            .setDescription(`
                > **Question:**
                > ${frage}
    
                > :one: = `+'`'+antwort1+'`'+`
    
                > :two: = `+'`'+antwort2+'`'+`
    
                > Poll created by <@${interaction.member.id}>
            `)
            .setThumbnail('https://media.discordapp.net/attachments/1209188549815959572/1283990050073219142/88e282ff5742e16142711739058393ec.jpg?ex=66e5006b&is=66e3aeeb&hm=e9870290d3a69dc2c81063544c9565c284ebc235daef1b436eaae242f9c5b54d&=&format=webp&width=547&height=671')
            .setFooter({
                text:'frozen.dev',
                iconURL:'https://media.discordapp.net/attachments/1209188549815959572/1283990050073219142/88e282ff5742e16142711739058393ec.jpg?ex=66e5006b&is=66e3aeeb&hm=e9870290d3a69dc2c81063544c9565c284ebc235daef1b436eaae242f9c5b54d&=&format=webp&width=547&height=671'
            })
    
            interaction.guild.channels.cache.get('1283986910842458142').send({ content: `<@&1222468086456651845>`, embeds: [Embed] })
            .catch((err) => {})
            .then((msg) => {
                msg.react('1️⃣')
                msg.react('2️⃣')
            });
    
            interaction.reply({ content: 'Successfully created the Poll.', ephemeral: true })
            .catch((err) => {});
            break;

        case "terms_accept":
            const allowed = ["ゝ। Member"];
            const hasAllowedRole = allowed.some(roleName => {
                const role = interaction.member.roles.cache.find(r => r.name === roleName);
                return !!role;
            });

            if (hasAllowedRole) {
                interaction.reply({ content: 'You re allready verified.', ephemeral: true })
                .catch((err) => {});
            } else {
                interaction.member.roles.add("1222468086456651845").catch((err) => {});
                interaction.reply({ content: 'You have been Successfully Verified.', ephemeral: true })
                .catch((err) => {});
            }
            break;

        case "terms_refuse":
            interaction.member.kick({ reason: 'refusing the terms of service.' })
            .catch((err) => {});
            interaction.reply({ content: 'bye', ephemeral: true })
            .catch((err) => {});
            break
    }
}