const Discord = module.require("discord.js");
const fs = require("fs");
let profile = require('../profile.json');
module.exports.run = async (dsbot,message,args) => {
    // message.reply(message.mentions.first);
    fir = message.author.id;
    message.mentions.users.forEach(function(item, i) {
        sec = item.id;
    });
    u = profile[fir];
    u2 = profile[sec];
    n = Math.floor(Math.random() * (1 - 0 + 1)) + 0;
    if (u.coins < 10) {
        message.channel.send(`<@${fir}>, вы бомж и не можете драться!`)
    } else {
        if (u2.coins == 0) {
            message.channel.send(`<@${fir}>, не стоит глумиться над <@${sec}>. Он бомж!`)
        } else {
            if (n == 1) {
                if (u2.coins >= 10) {
                    u.coins +=10;
                    u2.coins -=10;
                    message.channel.send(`<@${fir}> отпиздил <@${sec}> и отжал 10 монет!`);
                } else {
                    u.coins += u2.coins;
                    message.channel.send(`<@${fir}> отпиздил <@${sec}> и отжал последние ${u2.coins} монет!`);
                    u2.coins = 0;
                }
            } else {
                u2.coins +=10;
                message.channel.send(`<@${fir}> напал на <@${sec}>, но тот дал сдачи и забрал 10 монет!`);
                u.coins -=10;
            }  
        }         
    }
};
module.exports.help = {
    name: "бой"
}