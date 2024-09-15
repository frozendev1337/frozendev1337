const { SlashCommandBuilder, EmbedBuilder, ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle, PermissionsBitField } = require('discord.js');
const fs = require('fs');

// module.exports = {
//     data: new SlashCommandBuilder()
//     .setName('obffiles')
//     .setDescription('sends a list auf all obfuscated files.'),
//     async execute(interaction, client) {
//         if (interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
//             const files = await fs.readdirSync("./files/");
//             let msg = "";
//             let filecount = 0;

//             if (files.length == 0) {
//                 return false;
//             }
        
//             for await (const file of files) {
//                 msg = msg + "\n> `" + file + "`";
//                 filecount++;
//             }

//             let msg2 = `**__Here is a list of all obfuscated files:__**\n\n> **${filecount} files protected.**${msg}`;

//             interaction.reply({
//                 content: msg2,
//                 ephemeral: true
//             }).catch((err) => {});
//         } else {
//             return interaction.reply({
//                 content: 'you dont have permissions to do that.',
//                 ephemeral: true
//             }).catch((err) => {});
//         }
//     }
// };

module.exports = {
    data: new SlashCommandBuilder()
    .setName('obffiles')
    .setDescription('sends a list auf all obfuscated files.'),
    async execute(interaction, client) {
        if (interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            const data = require('./../data.json');
            let msg = "";
            let filecount = 0;
        
            // for await (const file of files) {
            //     msg = msg + "\n> `" + file + "`";
            //     filecount++;
            // }

            data.obfFiles.forEach(async (current) => {
                msg = msg + "\n> `" + current.file + "` => <@" + current.author.id + ">";
                filecount++;
            });

            let msg2 = `**__Here is a list of all obfuscated files:__**\n\n> **${filecount} files protected by frozen.**${msg}`;

            interaction.reply({
                content: msg2,
                ephemeral: true
            }).catch((err) => {});
        } else {
            return interaction.reply({
                content: 'you dont have permissions to do that.',
                ephemeral: true
            }).catch((err) => {});
        }
    }
};