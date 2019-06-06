const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (dsbot,message,args) => {
    let profile = require('../profile.json');
    let uid = message.author.id;
    let u = profile[uid];
    message.channel.send(`Монеты: ${u.coins}\nУровень: ${u.lvl}\nОпыт: ${u.xp}`);
};
module.exports.help = {
    name: "профиль"
}