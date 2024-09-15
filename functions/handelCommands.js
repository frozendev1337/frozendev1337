const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const clientId = '1223302905885495359'; 
const guildId = '1222468086255452190'; 

module.exports = (client) => {
    client.handleCommands = async (commandFolders, commandsPath) => {
        client.commandArray = [];
        client.commands = new Map();

        const commandFiles = fs.readdirSync(path.resolve(commandsPath)).filter(file => file.endsWith('.js'));
        
        for (const file of commandFiles) {
            const command = require(path.resolve(commandsPath, file)); 
            if (command?.data?.name) {
                client.commands.set(command.data.name, command);  
                client.commandArray.push(command.data.toJSON()); 
            } else {
                console.error(`The command at ${file} is missing required "data" or "name" property.`);
            }
        }


        const rest = new REST({
            version: '9'
        }).setToken('MTIyMzMwMjkwNTg4NTQ5NTM1OQ.GlokXi.OMphnR19fzQiuNhtN8h-NGyk14SerABsPNP6Nc');

        try {
            console.log('Started refreshing application commands...');
            
            const route = guildId
                ? Routes.applicationGuildCommands(clientId, guildId)
                : Routes.applicationCommands(clientId);

            await rest.put(route, {
                body: client.commandArray,
            });

            console.log('Successfully reloaded application commands.');
        } catch (error) {
            console.error('Error reloading application commands:', error);
        }
    };
};
