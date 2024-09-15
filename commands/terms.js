const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('terms')
    .setDescription('Sends the Terms of Service.'),
    async execute(interaction, client) {
        if (interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            const Embed = new EmbedBuilder()
            .setAuthor({
                name:'frozen.dev',
                iconURL:'https://cdn.discordapp.com/attachments/1209188549815959572/1283990050073219142/88e282ff5742e16142711739058393ec.jpg?ex=66e5006b&is=66e3aeeb&hm=e9870290d3a69dc2c81063544c9565c284ebc235daef1b436eaae242f9c5b54d&'
            })
            .setColor('#0097ff')
            .setTimestamp()
            .setTitle('Terms of Service')
            .setDescription(`
                > :flag_de:
§1: Spam
Spamming jeglicher Form ist in sämtlichen Textchannels verboten.

§2: Earrape
Earrape, d.h. bewusst laute Geräusche zu machen oder abzuspielen, ist in sämtlichen Voicechannels verboten.

§3: IP-Logger und Viren
Das Verwenden von IP-Loggern und Viren ist verboten.

§4: Werbung
Werbung für andere Discord-Server ist in allen Text- und Voicechannels, sowie auch über PN, verboten.

§5: Tierquälerei und Blutinhalte
Das Verbreiten von Videos und Bildern, welche Tierquälerei und Blutinhalte zeigen, ist verboten.

§6: Kinderpornographie
Das Verbreiten von Pornographie Minderjähriger ist verboten.

§7: Leaks
Es dürfen weder Bilder einer Person, noch die Adresse oder andere private Daten, ohne ihre Einverständnis, geleakt werden. Dies ist auch per PN verboten.

§8: Drohung und Erpressung
Das Drohen und Erpressen von Usern, beispielsweise mit einem Leak, ist verboten.

§9: Beleidigungen
Das Beleidigen von Usern ist verboten.

§10: Aufnehmen
Das Aufnehmen von Usern in Voice-channels ist verboten.

§11: Bots und Raids
Das Verwenden von Bot-Accounts und Durchführen von Raids ist verboten.

§12: Hierarchie
Anweisungen der Teammitglieder sind ohne Widerspruch Folge zu leisten.
                
                > **Discord Terms**
                > https://discord.com/terms
                
                > **Discord Guidelines**
                > https://discordapp.com/guidelines
            `)
            .setThumbnail('https://cdn.discordapp.com/attachments/1209188549815959572/1283990050073219142/88e282ff5742e16142711739058393ec.jpg?ex=66e5006b&is=66e3aeeb&hm=e9870290d3a69dc2c81063544c9565c284ebc235daef1b436eaae242f9c5b54d&')
            .setImage('https://media.discordapp.net/attachments/938931641219432559/1251806640261562438/gif4.gif?ex=66e49808&is=66e34688&hm=2d61cb0377590a7aa4615cf8e76c511630e06ae2dc96f78ef34c6f021f033fdb&')
            .setFooter({
                text:'frozen.dev',
                iconURL:'https://cdn.discordapp.com/attachments/1209188549815959572/1283990050073219142/88e282ff5742e16142711739058393ec.jpg?ex=66e5006b&is=66e3aeeb&hm=e9870290d3a69dc2c81063544c9565c284ebc235daef1b436eaae242f9c5b54d&'
            })

            const Buttons = new ActionRowBuilder();
            Buttons.addComponents(
                new ButtonBuilder()
                .setLabel('Accept')
                .setStyle(ButtonStyle.Success)
                .setCustomId('terms_accept'),

                new ButtonBuilder()
                .setLabel('Refuse')
                .setStyle(ButtonStyle.Danger)
                .setCustomId('terms_refuse'),

                new ButtonBuilder()
                .setLabel('Discord Terms')
                .setStyle(ButtonStyle.Link)
                .setURL('https://discord.com/terms'),

                new ButtonBuilder()
                .setLabel('Discord Guidelines')
                .setStyle(ButtonStyle.Link)
                .setURL('https://discordapp.com/guidelines'),
            )

            interaction.reply({ content: 'Successfull sended the terms in <#1283945541633441844>.', ephemeral: true })
            .catch((err) => {});

            return interaction.guild.channels.cache.get('1283945541633441844').send({ embeds: [Embed], components: [Buttons] })
            .catch((err)=>{});
        } else {
            return interaction.reply({ content: 'you dont have permissions to do that.', ephemeral: true })
            .catch((err) => {});
        }
    },
};