const { EmbedBuilder, PermissionsBitField, ButtonBuilder, ButtonComponent, ButtonInteraction, ButtonStyle } = require('discord.js');
const { green, red, blue, white, black, orange, yellow } = require('chalk');

function print(str) {
    let msg = `${red(`frozen.dev`)} ${green(`>>>`)} ${blue(`${str}`)}`;
    console.log(msg);
}

module.exports = {
    name: 'messageCreate',
    async execute(message, client) {
        if (message.author.bot) return;

        if (message.content.toLowerCase().startsWith('.ban')) {
            if (message.member.permissions.has(PermissionsBitField.Flags.BanMembers) || message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
                const args = message.content.slice('.ban'.length).trim().split(' ');
                const userId = args[0];

                if (!userId) return;

                const member = await client.users.fetch(userId);

                await message.guild.bans.create(member, {
                    reason: `banned by ${message.author.username}`
                }).catch((err) => {});

                const Embed = new EmbedBuilder()
                .setAuthor({
                    name: 'frozen.dev',
                    iconURL: 'https://media.discordapp.net/attachments/1209188549815959572/1283990050073219142/88e282ff5742e16142711739058393ec.jpg?ex=66e5006b&is=66e3aeeb&hm=e9870290d3a69dc2c81063544c9565c284ebc235daef1b436eaae242f9c5b54d&=&format=webp&width=547&height=671',
                })
                .setColor('#0097ff')
                .setTimestamp()
                .setDescription(`
                    🚀 banned **${member.tag}** successfull ✅

                    **user id**
                    \`\`\`${member.id}\`\`\`\

                    **user tag**
                    \`\`\`${member.tag}\`\`\`\

                    **avatar**
                    \`\`\`${member.avatarURL()}\`\`\`\

                    **created at**
                    \`\`\`soon\`\`\`\
                `)
                .setThumbnail('https://media.discordapp.net/attachments/1209188549815959572/1283990050073219142/88e282ff5742e16142711739058393ec.jpg?ex=66e5006b&is=66e3aeeb&hm=e9870290d3a69dc2c81063544c9565c284ebc235daef1b436eaae242f9c5b54d&=&format=webp&width=547&height=671')
                .setFooter({
                    text: 'frozen.dev',
                    iconURL: 'https://media.discordapp.net/attachments/1209188549815959572/1283990050073219142/88e282ff5742e16142711739058393ec.jpg?ex=66e5006b&is=66e3aeeb&hm=e9870290d3a69dc2c81063544c9565c284ebc235daef1b436eaae242f9c5b54d&=&format=webp&width=547&height=671',
                });

                return message.reply({
                    content: `<@${member.id}>`,
                    embeds: [Embed],
                }).catch((err) => {}).then(async () => {
                    print(`${message.author.tag} hat ${member.tag} gebannt.`)
                });
            }
        }

        const data = require('./../data.json');

        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            data.blacklistedWords.forEach(async (word) => {
                if (message.content.includes(word)) {
                    print(`${message.author.tag} hat der nicht Erlaubte Wort "${word.toLowerCase()}" in "${message.channel.name}" Geschrieben!`)
                    return message.delete().catch((err) => {});
                }
            });
        }

        if (message.channel.id === '1283921082524631062') {
            data.blacklistedWords.forEach(async (word) => {
                if (message.content.toLowerCase().includes(word.toLowerCase())) {
                    return message.delete().catch((err) => {});
                }
            });

            setTimeout(async () => {
                const Embed = new EmbedBuilder()
                .setAuthor({
                    name: 'frozen.dev',
                    iconURL: 'https://media.discordapp.net/attachments/1209188549815959572/1283990050073219142/88e282ff5742e16142711739058393ec.jpg?ex=66e5006b&is=66e3aeeb&hm=e9870290d3a69dc2c81063544c9565c284ebc235daef1b436eaae242f9c5b54d&=&format=webp&width=547&height=671'
                })
                .setTitle(`Idea from ${message.author.tag}`)
                .setDescription(`${message.content}`)
                .setColor('#0097ff')
                .setTimestamp()
                .setFooter({
                    text: 'frozen.dev',
                    iconURL: 'https://media.discordapp.net/attachments/1209188549815959572/1283990050073219142/88e282ff5742e16142711739058393ec.jpg?ex=66e5006b&is=66e3aeeb&hm=e9870290d3a69dc2c81063544c9565c284ebc235daef1b436eaae242f9c5b54d&=&format=webp&width=547&height=671',
                })
    
                return message.channel.send({
                    content: `<@${message.author.id}>`,
                    embeds: [Embed],
                }).catch((err) => {}).then(async (msg) => {
                    msg.react('👍').catch((err) => {});
                    msg.react('👎').catch((err) => {});
                    message.delete().catch((err) => {});
                });
            }, 2 * 1000);
        }
    },
};