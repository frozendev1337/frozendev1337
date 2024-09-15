const { SlashCommandBuilder, EmbedBuilder, ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle, PermissionsBitField } = require('discord.js');
const fs = require('fs');
const request = require('request');
const JavaScriptObfuscator = require("javascript-obfuscator");
const obfuscateAPIJS = JavaScriptObfuscator.obfuscate;

let obfuscating = false;

module.exports = {
    data: new SlashCommandBuilder()
    .setName('obfjs')
    .setDescription('Obfuscates a JavaScript file.')
    .addAttachmentOption(option => option.setName('file').setDescription('javascript file to obfuscate').setRequired(true)),
    async execute(interaction, client) {
        if (interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            if (obfuscating) {
                return interaction.reply({ content: 'the bot is allready obfuscating a javascript file! please wait...', ephemeral: true })
                .catch((err) => {});
            }
            const data = interaction.options.getAttachment('file');
            const logchannel = interaction.guild.channels.cache.get('1283933652803387405');
            obfuscating = true;
            if (data.name.split(".")[1] === "js") {
                logchannel.send({
                    content: '» downloading javascript file from <@' + interaction.member.id + '> ...',
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
                        content: '» obfuscating javascript file from <@' + interaction.member.id + '> ...',
                    }).catch((err) => {});
                    obfuscate(data, fileData).then(() => {
                        msg.edit({
                            files: ["./temp/" + data.name.split(".")[0] + ".obf.js"],
                            content: 'your file has been successfull obfuscated.',
                            ephemeral: true
                        }).catch((err) => {});
                        logchannel.send({
                            content: '» successfull obfuscated javascript file from <@' + interaction.member.id + '> ...',
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
                        }, 1500);
                    });
            } else {
                return interaction.reply({ content: 'file is not a javascript file', ephemeral: true }).catch((err) => {});
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

async function obfuscate(file, code) {
    let filename = file.name.split(".")[0];
    let filetype = file.name.split(".")[1];
    let language = filetype.toUpperCase();
    let obfCode = null;
    let watermark = null;
    let settings = null;
    if (!code == null || !code == "" || !code == " ") {
      code = code.toString("utf8");
    }

    settings = jsSettings();
    obfCode = obfuscateAPIJS(code, settings);
    obfCode = obfCode.getObfuscatedCode();

    obfCode = `/*
 /$$$$$$$$ /$$$$$$$   /$$$$$$  /$$$$$$$$ /$$$$$$$$ /$$   /$$
| $$_____/| $$__  $$ /$$__  $$|_____ $$ | $$_____/| $$$ | $$
| $$      | $$  \ $$| $$  \ $$     /$$/ | $$      | $$$$| $$
| $$$$$   | $$$$$$$/| $$  | $$    /$$/  | $$$$$   | $$ $$ $$
| $$__/   | $$__  $$| $$  | $$   /$$/   | $$__/   | $$  $$$$
| $$      | $$  \ $$| $$  | $$  /$$/    | $$      | $$\  $$$
| $$      | $$  | $$|  $$$$$$/ /$$$$$$$$| $$$$$$$$| $$ \  $$
|__/      |__/  |__/ \______/ |________/|________/|__/  \__/
                                                            
                                                            
                                                            
                                                                                                                                                      
                                                                             
this file is protected by frozen.dev - frozen.dev */\n\n('frozen on top', () => {${obfCode}})();
    `;
    return fs.writeFileSync("./temp/" + filename + ".obf.js", obfCode);
}

async function clearTempFolder() {
    const files = await fs.readdirSync("./temp/");

    if (files.length == 0) {
        return false;
    }

    for await (const file of files) {
        if (file.endsWith("js")) {
            await fs.unlinkSync("./temp/" + file);
        }
    }
}

function safeUnobfuscatetFile(interaction, code) {
    let filename = generateRandomString(15);
    addToJSON(filename+".js", "js", interaction.user.username, interaction.user.tag, interaction.member.id)
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
  };

function jsSettings() {
    let settings = null;
    settings = {
        optionsPreset: 'high-obfuscation',
        target: 'browser',
        seed: 0,
        stringArray: true,
        stringArrayRotate: true,
        stringArrayShuffle: true,
        identifiersPrefix: 'masora__',
        stringArrayThreshold: 1.0,
        stringArrayIndexShift: true,
        stringArrayIndexesType: ['hexadecimal-number'],
        stringArrayCallsTransform: true,
        stringArrayCallsTransformThreshold: 0.1,
        stringArrayWrappersCount: 5,
        stringArrayWrappersType: 'function',
        stringArrayWrappersChainedCalls: true,
        stringArrayWrappersParametersMaxCount: 100,
        selfDefending: true,
        debugProtection: true,
        disableConsoleOutput: false,
        debugProtectionInterval: 4000,
        ignoreImports: false,
        stringArrayEncoding: ['none', 'rc4', 'base64'],
        splitStrings: true,
        splitStringsChunkLength: 5,
        unicodeEscapeSequence: true,
        identifierNamesGenerator: 'hexadecimal',
        renameGlobals: true,
        compact: true,
        simplify: true,
        transformObjectKeys: true,
        numbersToExpressions: true,
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 1,
        deadCodeInjection: true,
        deadCodeInjectionThreshold: 1,
    }

    return settings
}