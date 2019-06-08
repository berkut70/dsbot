const Discord = module.require("discord.js");
const fs = require("fs");
const YTDL = require("ytdl-core");
var servers = {};
function play(connection, message) {
    var server = servers[message.guild.id];
    server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));  
    server.queue.shift();
    server.dispatcher.on("end", function() {
        if (server.queue[0]) play(connection, message);
        else connection.disconnect();
    })  
}
module.exports.run = async (dsbot,message,args) => {
    if (!args[0]) {
        message.reply("укажите ссылку на видео!");
        return;
    } 

    if (!message.member.voiceChannel) {
        message.reply("вы должны находиться в канале!");
        return;
    } 

    if (!servers[message.guild.id]) servers[message.guild.id] = {
        queue: []
    }

    var server = servers[message.guild.id];

    server.queue.push(args[0]);

    if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
        play(connection, message);
    })
};
module.exports.help = {
    name: "music"
}

    