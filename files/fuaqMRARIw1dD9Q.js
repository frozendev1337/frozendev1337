const Discord = require('discord.js');
const { createTranscript } = require('discord-html-transcripts');
const { createConnection } = require('mysql');
const { Config, TicketConfig, DatabaseConfig } = require('./config.js');

const client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.MessageContent,
        Discord.GatewayIntentBits.GuildMembers,
    ],
});

// const database = createConnection({
//     host: DatabaseConfig.host,
//     user: DatabaseConfig.user,
//     password: DatabaseConfig.password,
//     database: DatabaseConfig.database,
// });

//database.connect();

client.on('ready', async () => {
    client.channels.cache.get(TicketConfig.TicketChannel).bulkDelete(100)
    let msg = await client.channels.cache.get(TicketConfig.TicketChannel).send(Config.Bot.Prefix + 'ticketpanel');
    setTimeout(() => {
        msg.delete().catch((err) => {
            console.log(err);
        });
    }, 1000);
    console.clear();
    console.log('[FROZEN-TICKETS] LOGGED IN!');
});

client.on('messageCreate', async (message) => {
    if (message.content.startsWith(Config.Bot.Prefix + 'ticketpanel')) {
        if (message.author.id === client.user.id) {
            let Embed = new Discord.EmbedBuilder()
            Embed.setAuthor({ name: `FROZEN`, iconURL: DesignConfig.Logo })
            Embed.setTitle('**__Tickets__**')
            Embed.setDescription(`Hier kannst du ein Ticket Erstellen!
            
            Klicke auf Ticket Erstellen um ein Ticket zu Erstellen!
            `)
            Embed.setThumbnail(DesignConfig.Logo)
            Embed.setColor(DesignConfig.Color)
            Embed.setFooter({ text: 'FROZEN', iconURL: DesignConfig.Logo })

            let OpenSupportTicket = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                .setCustomId('openticketmenu')
                .setEmoji('📂')
                .setLabel('Ticket Erstellen')
                .setStyle(Discord.ButtonStyle.Danger)
            );

            message.channel.send({ embeds: [Embed], components: [OpenSupportTicket] }).catch((err) => {
                console.log(err);
            });
        } 
    }
});

client.on('interactionCreate', async (i) => {
    if (i.customId === 'openticketmenu') {
        const select = new Discord.StringSelectMenuBuilder()
        .setCustomId('ticketmenuu')
        .setPlaceholder('Wähle ein Ticket aus!')
        .addOptions(
            new Discord.StringSelectMenuOptionBuilder()
                .setLabel('📨 Support Ticket')
                .setValue('support'),
            new Discord.StringSelectMenuOptionBuilder()
                .setLabel('💳 Buy Ticket')
                .setValue('buy'),
            new Discord.StringSelectMenuOptionBuilder()
                .setLabel('🤝 Partner Ticket')
                .setValue('partner'),
        );

        const row = new Discord.ActionRowBuilder()
            .addComponents(select);

        await i.reply({ components: [row], ephemeral: true })
    } 
    
    if (i.customId === 'ticketmenuu') {
        let choices = '';

        await i.values.forEach(async value => {
            choices += `${value}`
        })

        if (choices === 'support') {
            const newTicket = await i.guild.channels.create({
                name: `📨〢${i.user.username}`,
                type: Discord.ChannelType.GuildText,
                parent: client.channels.cache.get(TicketConfig.Catiguri),
                permissionOverwrites: [
                    {
                        id: i.guild.roles.everyone.id,
                        deny: [Discord.PermissionsBitField.Flags.ViewChannel],
                    },
                    {
                        id: i.user.id,
                        allow: [Discord.PermissionsBitField.Flags.SendMessages, Discord.PermissionsBitField.Flags.ViewChannel]
                    },
                    {
                        id: TicketConfig.TeamRole,
                        allow: [Discord.PermissionsBitField.Flags.SendMessages, Discord.PermissionsBitField.Flags.ViewChannel],
                    },
                ]
            }).catch(err => {
                console.log(err);
            });

            let Embed = new Discord.EmbedBuilder()
            Embed.setAuthor({ name: `FROZEN`, iconURL: DesignConfig.Logo })
            Embed.setTitle('**__Support Ticket__**')
            Embed.setDescription(`> :flag_de:\n> Schildere dein Problem/Anliegen nach Eröffnung des Tickets.\nDas Support-Team wird das Ticket nach der Eröffnung,\n> So schnell wie möglich bearbeiten.\n\n> :england:\n> Describe your problem/concern after opening the ticket.\n> The support team will process the ticket\nas soon as possible after opening.`)
            Embed.setThumbnail(DesignConfig.Logo)
            Embed.setColor(DesignConfig.Color)
            Embed.setFooter({ text: 'FROZEN', iconURL: DesignConfig.Logo })

            let buttons = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                .setCustomId('closerequest')
                .setEmoji('🔒')
                .setLabel('Close')
                .setStyle(Discord.ButtonStyle.Danger)
            )
            .addComponents(
                new Discord.ButtonBuilder()
                .setCustomId('claimticket')
                .setEmoji('🔧')
                .setLabel('Claim')
                .setStyle(Discord.ButtonStyle.Danger)
            );

            newTicket.send({ content: `<@${i.user.id}>`, embeds: [Embed], components: [buttons] }).catch((err) => {
                console.log(err);
            });

            await i.reply({ content: `Your Ticket: <#${newTicket.id}>`, ephemeral: true }).catch((err) => {
                console.log(err);
            });
        }

        if (choices === 'buy') {
            const newTicket = await i.guild.channels.create({
                name: `💳〢${i.user.username}`,
                type: Discord.ChannelType.GuildText,
                parent: client.channels.cache.get(TicketConfig.Catiguri),
                permissionOverwrites: [
                    {
                        id: i.guild.roles.everyone.id,
                        deny: [Discord.PermissionsBitField.Flags.ViewChannel],
                    },
                    {
                        id: i.user.id,
                        allow: [Discord.PermissionsBitField.Flags.SendMessages, Discord.PermissionsBitField.Flags.ViewChannel]
                    },
                    {
                        id: TicketConfig.TeamRole,
                        allow: [Discord.PermissionsBitField.Flags.SendMessages, Discord.PermissionsBitField.Flags.ViewChannel],
                    },
                ]
            }).catch(err => {
                console.log(err);
            });

            let Embed = new Discord.EmbedBuilder()
            Embed.setAuthor({ name: `FROZEN`, iconURL: DesignConfig.Logo })
            Embed.setTitle('**__Buy Ticket__**')
            Embed.setDescription(`> :flag_de:\n> Ein Teammitglied würde sich bald um dich Kümmern!\n\n> :england:\n> A team member would take care of you soon!A team member would take care of you soon!`)
            Embed.setThumbnail(DesignConfig.Logo)
            Embed.setColor(DesignConfig.Color)
            Embed.setFooter({ text: 'FROZEN', iconURL: DesignConfig.Logo })

            let buttons = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                .setCustomId('closerequest')
                .setEmoji('🔒')
                .setLabel('Close')
                .setStyle(Discord.ButtonStyle.Danger)
            )
            .addComponents(
                new Discord.ButtonBuilder()
                .setCustomId('claimticket')
                .setEmoji('🔧')
                .setLabel('Claim')
                .setStyle(Discord.ButtonStyle.Danger)
            );

            newTicket.send({ content: `<@${i.user.id}>`, embeds: [Embed], components: [buttons] }).catch((err) => {
                console.log(err);
            });

            await i.reply({ content: `Your Ticket: <#${newTicket.id}>`, ephemeral: true }).catch((err) => {
                console.log(err);
            });
        }

        if (choices === 'partner') {
            const newTicket = await i.guild.channels.create({
                name: `🤝〢${i.user.username}`,
                type: Discord.ChannelType.GuildText,
                parent: client.channels.cache.get(TicketConfig.Catiguri),
                permissionOverwrites: [
                    {
                        id: i.guild.roles.everyone.id,
                        deny: [Discord.PermissionsBitField.Flags.ViewChannel],
                    },
                    {
                        id: i.user.id,
                        allow: [Discord.PermissionsBitField.Flags.SendMessages, Discord.PermissionsBitField.Flags.ViewChannel],
                    },
                    {
                        id: TicketConfig.TeamRole,
                        allow: [Discord.PermissionsBitField.Flags.SendMessages, Discord.PermissionsBitField.Flags.ViewChannel],
                    },
                ]
            }).catch(err => {
                console.log(err);
            });

            let Embed = new Discord.EmbedBuilder()
            Embed.setAuthor({ name: `FROZEN`, iconURL: DesignConfig.Logo })
            Embed.setTitle('**__Partner Ticket__**')
            Embed.setDescription(`> :flag_de:\n> Ein Teammitglied würde sich bald um dich Kümmern!\n\n> :england:\n> A team member would take care of you soon!A team member would take care of you soon!`)
            Embed.setThumbnail(DesignConfig.Logo)
            Embed.setColor(DesignConfig.Color)
            Embed.setFooter({ text: 'FROZEN', iconURL: DesignConfig.Logo })

            let buttons = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                .setCustomId('closerequest')
                .setEmoji('🔒')
                .setLabel('Close')
                .setStyle(Discord.ButtonStyle.Danger)
            )
            .addComponents(
                new Discord.ButtonBuilder()
                .setCustomId('claimticket')
                .setEmoji('🔧')
                .setLabel('Claim')
                .setStyle(Discord.ButtonStyle.Danger)
            );

            newTicket.send({ content: `<@${i.user.id}>`, embeds: [Embed], components: [buttons] }).catch((err) => {
                console.log(err);
            });

            await i.reply({ content: `Your Ticket: <#${newTicket.id}>`, ephemeral: true }).catch((err) => {
                console.log(err);
            });
        }
    }

    if (i.customId === 'closerequest') {
        let Embed = new Discord.EmbedBuilder()
        Embed.setAuthor({ name: `FROZEN`, iconURL: DesignConfig.Logo })
        Embed.setTitle('**__Support-System__**')
        Embed.setDescription(`<@${i.user.id}> are you sure you want to close this ticket?`)
        Embed.setThumbnail(DesignConfig.Logo)
        Embed.setColor(DesignConfig.Color)
        Embed.setFooter({ text: 'FROZEN', iconURL: DesignConfig.Logo })

        let buttons = new Discord.ActionRowBuilder()
        .addComponents(
            new Discord.ButtonBuilder()
            .setCustomId('closeticket')
            .setEmoji('🔒')
            .setLabel('Yes')
            .setStyle(Discord.ButtonStyle.Danger)
        )
        .addComponents(
            new Discord.ButtonBuilder()
            .setCustomId('closerequestcancle')
            .setEmoji('🔓')
            .setLabel('No')
            .setStyle(Discord.ButtonStyle.Danger)
        );

        i.reply({ embeds: [Embed], components: [buttons], ephemeral: false }).catch((err) => {
            console.log(err);
        });
    }

    if (i.customId === 'closerequestcancle') {
        let Embed = new Discord.EmbedBuilder()
        Embed.setAuthor({ name: `FROZEN`, iconURL: DesignConfig.Logo })
        Embed.setTitle('**__Ticket-System__**')
        Embed.setDescription(`<@${i.user.id}> The request to close was canceled this ticket will remain open!`)
        Embed.setThumbnail(DesignConfig.Logo)
        Embed.setColor(DesignConfig.Color)
        Embed.setFooter({ text: 'FROZEN', iconURL: DesignConfig.Logo })

        i.reply({ embeds: [Embed], ephemeral: false }).catch((err) => {
            console.log(err);
        });
    }

    if (i.customId === 'closeticket') {
        let Embed = new Discord.EmbedBuilder()
        Embed.setAuthor({ name: `FROZEN`, iconURL: DesignConfig.Logo })
        Embed.setTitle('**__Ticket-System__**')
        Embed.setDescription(`<@${i.user.id}> This ticket will be deleted in **5** seconds!`)
        Embed.setThumbnail(DesignConfig.Logo)
        Embed.setColor(DesignConfig.Color)
        Embed.setFooter({ text: 'FROZEN', iconURL: DesignConfig.Logo })

        let Embed2 = new Discord.EmbedBuilder()
        Embed2.setAuthor({ name: `FROZEN`, iconURL: DesignConfig.Logo })
        Embed2.setTitle('**__Ticket-System__**')
        Embed2.setDescription(`<@${i.user.id}> This ticket will be deleted in **4** seconds!`)
        Embed2.setThumbnail(DesignConfig.Logo)
        Embed2.setColor(DesignConfig.Color)
        Embed2.setFooter({ text: 'FROZEN', iconURL: DesignConfig.Logo })

        let Embed3 = new Discord.EmbedBuilder()
        Embed3.setAuthor({ name: `FROZEN`, iconURL: DesignConfig.Logo })
        Embed3.setTitle('**__Ticket-System__**')
        Embed3.setDescription(`<@${i.user.id}> This ticket will be deleted in **3** seconds!`)
        Embed3.setThumbnail(DesignConfig.Logo)
        Embed3.setColor(DesignConfig.Color)
        Embed3.setFooter({ text: 'FROZEN', iconURL: DesignConfig.Logo })

        let Embed4 = new Discord.EmbedBuilder()
        Embed4.setAuthor({ name: `FROZEN`, iconURL: DesignConfig.Logo })
        Embed4.setTitle('**__Ticket-System__**')
        Embed4.setDescription(`<@${i.user.id}> This ticket will be deleted in **2** seconds!`)
        Embed4.setThumbnail(DesignConfig.Logo)
        Embed4.setColor(DesignConfig.Color)
        Embed4.setFooter({ text: 'FROZEN', iconURL: DesignConfig.Logo })

        let Embed5 = new Discord.EmbedBuilder()
        Embed5.setAuthor({ name: `FROZEN`, iconURL: DesignConfig.Logo })
        Embed5.setTitle('**__Ticket-System__**')
        Embed5.setDescription(`<@${i.user.id}> This ticket will be deleted in **1** second!`)
        Embed5.setThumbnail(DesignConfig.Logo)
        Embed5.setColor(DesignConfig.Color)
        Embed5.setFooter({ text: 'FROZEN', iconURL: DesignConfig.Logo })

        let msg = await i.reply({ embeds: [Embed], ephemeral: false }).catch((err) => {
            console.log(err);
        });

        var transcriptname = '';
        if (i.channel.name.includes('')) {
            transcriptname = i.channel.name.replace('📨〢', '');
        } else if (i.channel.name.includes('💳')) {
            transcriptname = i.channel.name.replace('💳〢', '');
        } else if (i.channel.name.includes('🤝')) {
            transcriptname = i.channel.name.replace('🤝〢', '');
        }

        var currentdate = new Date(); 
        var datetime = currentdate.getDate() + "/"
            + (currentdate.getMonth()+1)  + "/" 
            + currentdate.getFullYear() + " @"  

        let attachment = await createTranscript(i.channel, {
            limit: -1,
            returnBuffer: false,
            filename: `${transcriptname}-${datetime}.html`,
        }).catch((err) => {
            console.log(err);
        });

        setTimeout(() => {
            i.guild.channels.cache.get(TicketConfig.TranscripsChannel).send({ files: [attachment] }).catch((err) => {
                console.log(err)
            });
        }, 500);

        setTimeout(() => {
            msg.edit({ embeds: [Embed2], ephemeral: false }).catch((err) => {
                console.log(err);
            });
        }, 1000);

        setTimeout(() => {
            msg.edit({ embeds: [Embed3], ephemeral: false }).catch((err) => {
                console.log(err);
            });
        }, 2000);

        setTimeout(() => {
            msg.edit({ embeds: [Embed4], ephemeral: false }).catch((err) => {
                console.log(err);
            });
        }, 3000);

        setTimeout(() => {
            msg.edit({ embeds: [Embed5], ephemeral: false }).catch((err) => {
                console.log(err);
            });
        }, 4000);

        setTimeout(() => {
            if (i.channel.deletable) {
                i.channel.delete().catch((err) => {
                    console.log(err);
                });
            }
        }, 5000);
    }

    if (i.customId === 'claimticket') {
        if (i.member.roles.cache.has(TicketConfig.TeamRole)) {
            i.channel.edit({
                type: Discord.ChannelType.GuildText,
                parent: client.channels.cache.get(Config.TicketCategory.Support),
                permissionOverwrites: [
                    {
                        id: i.guild.roles.everyone.id,
                        deny: [Discord.PermissionsBitField.Flags.ViewChannel],
                    },
                    {
                        id: i.user.id,
                        allow: [Discord.PermissionsBitField.Flags.SendMessages, Discord.PermissionsBitField.Flags.ViewChannel]
                    },
                    {
                        id: TicketConfig.TeamRole,
                        allow: [Discord.PermissionsBitField.Flags.ViewChannel],
                        deny: [Discord.PermissionsBitField.Flags.SendMessages],
                    },
                ]
            }).catch((err) => {
                console.log(err);
            });

            let Embed = new Discord.EmbedBuilder()
            Embed.setAuthor({ name: `FROZEN`, iconURL: DesignConfig.Logo })
            Embed.setTitle('**__Ticket-System__**')
            Embed.setDescription(`<@${i.user.id}> has Claimed the Ticket!`)
            Embed.setThumbnail(DesignConfig.Logo)
            Embed.setColor(DesignConfig.Color)
            Embed.setFooter({ text: 'FROZEN', iconURL: DesignConfig.Logo })

            i.reply({ embeds: [Embed], ephemeral: false }).catch((err) => {
                console.log(err);
            });
        } else {
            i.reply({ content: `Your not a Team Member!`, ephemeral: true }).catch((err) => {
                console.log(err);
            });
        }
    }
});

client.login(Config.Bot.Token)