const Discord = require('discord.js');
const fs = require('fs');
const { green, red, blue, white, black, orange, yellow } = require('chalk');
require("dotenv").config();

const client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildEmojisAndStickers,
        Discord.GatewayIntentBits.GuildIntegrations,
        Discord.GatewayIntentBits.GuildInvites,
        Discord.GatewayIntentBits.GuildMembers,
        Discord.GatewayIntentBits.GuildMessageReactions,
        Discord.GatewayIntentBits.GuildMessageTyping,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.GuildPresences,
        Discord.GatewayIntentBits.GuildScheduledEvents,
        Discord.GatewayIntentBits.GuildVoiceStates,
        Discord.GatewayIntentBits.GuildWebhooks,
        Discord.GatewayIntentBits.DirectMessages,
        Discord.GatewayIntentBits.DirectMessageTyping,
        Discord.GatewayIntentBits.DirectMessageReactions,
        Discord.GatewayIntentBits.MessageContent,
        Discord.GatewayIntentBits.GuildBans,
        Discord.GatewayIntentBits.GuildModeration,
        Discord.GatewayIntentBits.GuildPresences,
    ]
});

client.on('guildMemberUpdate', async (oldmember, newmember) => {
    if (newmember.premiumSinceTimestamp === null) return;
    if (oldmember.premiumSinceTimestamp === newmember.premiumSinceTimestamp) return;

    const channel = newmember.guild.channels.cache.get("1150577897078263919");

    const embed = new Discord.EmbedBuilder()
        .setTitle("Boost")
        .setTimestamp()
        .setFooter({
            text: 'frozen.dev',
            iconURL: 'https://media.discordapp.net/attachments/1209188549815959572/1283990050073219142/88e282ff5742e16142711739058393ec.jpg?ex=66e5006b&is=66e3aeeb&hm=e9870290d3a69dc2c81063544c9565c284ebc235daef1b436eaae242f9c5b54d&=&format=webp&width=547&height=671'
        })
        .setDescription(`Thank you ${newmember} for boosting our server!\n\nServer Boosts: ${newmember.guild.premiumSubscriptionCount}`)
        .setColor("#0097ff");

    channel.send({ embeds: [embed] });
});

client.commands = new Discord.Collection();

const functions = fs.readdirSync("./functions").filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./events").filter(file => file.endsWith(".js"));
const commandFolders = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

(async () => {
    for (const file of functions) {
        require(`./functions/${file}`)(client);
    }
    client.handleEvents(eventFiles, "./events");
    client.handleCommands(commandFolders, "./commands"); // Ensure this function is updated
    client.login('MTIyMzMwMjkwNTg4NTQ5NTM1OQ.GlokXi.OMphnR19fzQiuNhtN8h-NGyk14SerABsPNP6Nc');
})();
