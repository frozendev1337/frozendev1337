const Discord = require('discord.js');
const { green, red, blue, white, black, orange, yellow } = require('chalk');
require("dotenv").config();

function print(str) {
    let msg = `${red(`frozen.dev`)} ${green(`>>>`)} ${blue(`${str}`)}`;
    console.log(msg);
}

async function checkMutedUsers(client) {
    const data = require('./../data.json');
    const guild = await client.guilds.cache.get('1222468086255452190');
    const members = await guild.members.fetch();
    const roleid = '1230302863394340895';

    members.forEach(async (member) => {
        if (!member.user.bot) {
            data.muted.forEach(async (current) => {
                const mutedId = current;
                if (mutedId === member.id) {
                    if (!member.roles.cache.has(roleid)) {
                        member.roles.add(roleid).catch((err) => {});
                        print('Stummgeschlatet Rolle an ' + member.tag + ' Gegeben.')
                    }
                }
            });
        }
    });

    setTimeout(async () => {
        checkMutedUsers(client);
    }, 15 * 1000);
}

function updateStats(client) {
    const guild = client.guilds.cache.get("1222468086255452190");
    guild.channels.cache.get("1283993190491230281").setName(`👤┃Members: ${guild.memberCount}`).catch((err) => {});
    guild.channels.cache.get("1283993169083764792").setName(`👣┃Boosts: ${guild.premiumSubscriptionCount}`).catch((err) => {});
    setTimeout(() => {
        updateStats(client);
    }, 5 * 1000);
}

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        client.user.setPresence({
            activities: [{ name: `FROZEN.DEV`, type: Discord.ActivityType.Streaming }],
            status: 'dnd',
        });
        console.clear();
        print('Bot Startet...');
        setTimeout(() => {
            print('Bot wird mit dem Server Authentifiziert...');
        }, 1500);
        setTimeout(() => {
            print('Bot ist Erfolgreich Gestartet! Eingeloggt in ('+client.user.tag+')');
            checkMutedUsers(client);
            updateStats(client);
            const data = require('./../data.json');
        }, 2500);
    }
};