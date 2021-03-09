// Importing Libaries
const Discord = require('discord.js')
const client = new Discord.Client()

// Importing External Scripts
const config = require('./config.json')
const command = require('./command')
const editor = require('./message-editor')
const privateMessage = require('./private-message')

// Main Body
client.on('ready', () => {
    console.log('SERVER READY')

    // -ping
    command(client, ['ping', 'test'], (message) => {
        message.channel.send('Pong!')
        console.log('Replied with: Pong!')
    })

    // -servers Responds with user count of servers
    command(client, 'servers', (message) => {
        client.guilds.cache.forEach((guild) => {
            message.channel.send(`${guild.name} has a total of ${guild.memberCount} members`)
        })
    })

    // -cc Clears the channel
    command(client, ['cc', 'clearchannel'], (message) => {
        if (message.member.hasPermission('ADMINISTRATOR')) {
           message.channel.messages.fetch().then((results) => {
               message.channel.bulkDelete(results)
               console.log('Cleard Channel')
           })
        }
    })

    // -status Changes the status of the bot
    command(client, 'status' , (message) => {
        const content = message.content.replace('-status ', '')

        client.user.setPresence({
            activity: {
                name: content,
                type: 0,
            },
        })
    })

    // -createtextchannel Creates a text channel
    command(client, 'createtextchannel', (message) => {
        const name= message.content.replace('-createtextchannel', '')

        message.guild.channels
            .create(name, {
                type: 'text'
            }).then((channel) => {
                const categoryID = '818975314834358323'
                channel.setParent(categoryID)
        })
        
    })

    // -createvoicechannel Creates a Voice Channel
    command(client, 'createvoicechannel', (message) => {
        const name = message.content.replace('-createvoicechannel', '')

        message.guild.channels.create(name, {
            type: 'voice'
        })
            .then(channel => {
                const categoryID = '818975314834358323'
                channel.setParent(categoryID)
                channel.setUserLimit(10)
            })
    })

    // -embed Sends a embeded message
    command(client, 'embed', (message) => {
        const logo = 'https://pbs.twimg.com/profile_images/705674641847627780/tRKQBBt7_400x400.jpg'

        const embed = new Discord.MessageEmbed()
            .setTitle('Testing Embed')
            .setURL('https://www.youtube.com/')
            .setAuthor(message.author.username)
            .setImage(logo)

        message.channel.send(embed)
    })

    // DM
    privateMessage(client, 'ping', 'pong')

    // Stuff that runs at Startup
    editor(client, '818969909358624839', 'hello world', ['🔥'])
})

// Auth
client.login(config.token)