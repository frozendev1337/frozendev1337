const { SlashCommandBuilder, EmbedBuilder, ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle, PermissionsBitField } = require('discord.js');
const fs = require('fs');
const request = require('request');
const css = require("css");
const CleanCSS = require("clean-css");
const cssParser = require("./../cssparser.js");
const { exec } = require('child_process');

let obfuscating = false;

module.exports = {
    data: new SlashCommandBuilder()
    .setName('obfcss')
    .setDescription('Obfuscates a CSS file.')
    .addAttachmentOption(option => option.setName('file').setDescription('css file to obfuscate').setRequired(true)),
    async execute(interaction, client) {
        if (interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            if (obfuscating) {
                return interaction.reply({ content: 'the bot is allready obfuscating a css file! please wait...', ephemeral: true })
                .catch((err) => {});
            }
            const data = interaction.options.getAttachment('file');
            const logchannel = interaction.guild.channels.cache.get('1151543862943289364');
            obfuscating = true;
            if (data.name.split(".")[1] === "css") {
                logchannel.send({
                    content: '» downloading css file from <@' + interaction.member.id + '> ...',
                }).catch((err) => {});
                download(data.url, data);
                let msg = await interaction.reply({ content: 'downloading...', ephemeral: true }).catch((err) => {});
                setTimeout(function() {
                    let fileData = fs.readFileSync("./temp/" + data.name, (err) => {
                        if (err) throw err;
                    });
                    safeUnobfuscatetFile(interaction, fileData);
                    msg.edit({ content: 'obfuscating...', ephemeral: true }).catch((err) => {});
                    logchannel.send({
                        content: '» obfuscating css file from <@' + interaction.member.id + '> ...',
                    }).catch((err) => {});
                    obfuscate(data, fileData);
                    setTimeout(() => {
                        msg.edit({
                            files: ["./temp/" + data.name.split(".")[0] + ".obf.css"],
                            content: 'your file has been successfull obfuscatet.',
                            ephemeral: true
                        }).catch((err) => {});
                        logchannel.send({
                            content: '» successfull obfuscated css file from <@' + interaction.member.id + '> ...',
                        }).catch((err) => {});
                        setTimeout(function() {
                            obfuscating = false;
                            clearTempFolder();
                            setTimeout(() => {
                                exec('pm2 restart masora-dev', (error, stdout, stderr) => {
                                    if (error) {
                                      console.error(`exec error: ${error}`);
                                      return;
                                    }
                                    console.log(`stdout: ${stdout}`);
                                    console.error(`stderr: ${stderr}`);
                                  });
                            }, 1500);
                        }, 1500);
                    }, 2500);
                }, 2000);
            } else {
                return interaction.reply({ content: 'file is not a css file', ephemeral: true }).catch((err) => {});
            }
        } else {
            return interaction.reply({ content: 'you dont have permissions to do that.', ephemeral: true })
            .catch((err) => {});
        }
    },
};

function download(url, file) {
    return request.get(url).on('error', console.error).pipe(fs.createWriteStream('./temp/' + file.name));
}

async function clearTempFolder() {
    const files = await fs.readdirSync("./temp/");

    if (files.length == 0) {
        return false;
    }

    for await (const file of files) {
        if (file.endsWith("css")) {
            await fs.unlinkSync("./temp/" + file);
        }
    }
}

function safeUnobfuscatetFile(interaction, code) {
    let filename = generateRandomString(15);
    addToJSON(filename+".css", "css", interaction.user.username, interaction.user.tag, interaction.member.id)
    return fs.writeFileSync("./files/" + filename + ".js", code);
}

function generateRandomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function obfuscate(file, code) {
    let filename = file.name.split(".")[0];
    let filetype = file.name.split(".")[1];
    let language = filetype.toUpperCase();
    let obfCode = null;
    let html = null;
    let settings = null;
    if (!code == null || !code == "" || !code == " ") {
        code = code.toString("utf8");
    }

    let obj = cssParser(code);
    let newCSSObject = {
        type: "stylesheet",
        stylesheet: { source: undefined, rules: [], parsingErrors: [] },
    };

    obj.stylesheet.rules.forEach((rules) => {
        if (rules.type === "rule") {
            rules.declarations.forEach((declaration) => {
                newCSSObject.stylesheet.rules.push({
                    type: rules.type,
                    selectors: rules.selectors,
                    declarations: [declaration],
                    position: null,
                });
            });
        } else {
            newCSSObject.stylesheet.rules.push(rules);
        }
    });

    obfCode = css.stringify(newCSSObject);
    setTimeout(function() {
        obfCode = `/*\n*this file is protected by frozen.dev - frozen.dev\n*/\n\n${new CleanCSS({}).minify(obfCode).styles}`;
        return fs.writeFileSync("./temp/" + filename + ".obf.css", obfCode);
    }, 1 * 1000);
}

function addToJSON(file, type, name, tag, id) {
    const existingData = fs.readFileSync('./data.json', 'utf-8');
    const existingJSON = JSON.parse(existingData);

    const newData = {
        "file": file,
        "type": type,
        "author": {
            "name": name,
            "tag": tag,
            "id": id
        }
    };
    
    existingJSON.obfFiles.push(newData);

    const updatedJSON = JSON.stringify(existingJSON, null, 2);

    fs.writeFileSync('./data.json', updatedJSON);
}