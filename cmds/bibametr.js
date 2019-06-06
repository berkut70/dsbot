const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (dsbot,message,args) => {
    n = Math.floor(Math.random() * (45 - 1 + 1)) + 1;
    message.channel.send(`У <@${message.author.id}> биба ${n} см! <:SeemsGood:586240986594934795>`);
};
module.exports.help = {
    name: "bibametr"
}
