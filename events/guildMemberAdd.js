const { EmbedBuilder } = require('discord.js');
const { green, red, blue, white, black, orange, yellow } = require('chalk');

function print(str) {
    let msg = `${red(`frozen.dev`)} ${green(`>>>`)} ${blue(`${str}`)}`;
    console.log(msg);
}

module.exports = {
    name: 'guildMemberAdd',
    async execute(interaction, client) {
        const Embed = new EmbedBuilder()
        .setAuthor({
            name:'frozen.dev',
            iconURL:'https://media.discordapp.net/attachments/1209188549815959572/1283990050073219142/88e282ff5742e16142711739058393ec.jpg?ex=66e5006b&is=66e3aeeb&hm=e9870290d3a69dc2c81063544c9565c284ebc235daef1b436eaae242f9c5b54d&=&format=webp&width=547&height=671'
        })
        .setColor('#0097ff')
        .setTimestamp()
        .setTitle('Welcome to frozen.dev')
        .setDescription(`
            Hello <@${interaction.user.id}>, Welcome to **__frozen.dev__**
            
            Please read the rules and Verify yourself in <#1283945541633441844>!
            
            Members: ${interaction.guild.memberCount}

            **Best regards,**
            Your __frozen.dev__ Team
        `)
        .setThumbnail('https://media.discordapp.net/attachments/1209188549815959572/1283990050073219142/88e282ff5742e16142711739058393ec.jpg?ex=66e5006b&is=66e3aeeb&hm=e9870290d3a69dc2c81063544c9565c284ebc235daef1b436eaae242f9c5b54d&=&format=webp&width=547&height=671')
        .setImage('https://media.discordapp.net/attachments/938931641219432559/1251806640261562438/gif4.gif?ex=66e49808&is=66e34688&hm=2d61cb0377590a7aa4615cf8e76c511630e06ae2dc96f78ef34c6f021f033fdb&=')
        .setFooter({
            text:'frozen.dev',
            iconURL:'https://media.discordapp.net/attachments/1209188549815959572/1283990050073219142/88e282ff5742e16142711739058393ec.jpg?ex=66e5006b&is=66e3aeeb&hm=e9870290d3a69dc2c81063544c9565c284ebc235daef1b436eaae242f9c5b54d&=&format=webp&width=547&height=671'
        })

        interaction.guild.channels.cache.get("1283993190491230281").setName(`👤┃Members: ${interaction.guild.memberCount}`).catch((err) => {});
        interaction.guild.channels.cache.get("1283993169083764792").setName(`👣┃Boosts: ${interaction.guild.premiumSubscriptionCount}`).catch((err) => {});
        print('Mitglieder Counter auf ' + interaction.guild.memberCount + ' Aktualisiert.')
    
        return interaction.guild.channels.cache.get('1283939371791421450').send({ content: `<@${interaction.user.id}>`, embeds: [Embed] })
        .catch((err)=>{})
        .then(() => {
            print(`${interaction.user.tag} hat den Server Betreten.`);
        });
    },
};