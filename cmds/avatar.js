const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (dsbot,message,args) => {
    message.channel.send(message.author.avatarURL);
};
module.exports.help = {
    name: "аватар"
}