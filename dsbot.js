const Discord = require('discord.js');
const dsbot = new Discord.Client();
dsbot.commands = new Discord.Collection();
const fs = require("fs");
let config = require('./botconfig.json');
let token = config.token;
let prefix = config.prefix;
let profile = require('./profile.json');

fs.readdir('./cmds/',(err,files)=>{
    if (err) console.log(err);
    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if (jsfiles.length <= 0) console.log("Пустой комманд-лист");
    console.log(`Загружено ${jsfiles.length} комманд:`);
    jsfiles.forEach((f,i) =>{
        let props = require(`./cmds/${f}`);
        console.log(`${i+1}: ${f} загружен`);
        dsbot.commands.set(props.help.name,props);
    })
})

dsbot.on('ready', () => {
  console.log(`Бот ${dsbot.user.username} активен!`);
  dsbot.user.setGame('Саня, хуй соси!');
  dsbot.generateInvite(["ADMINISTRATOR"]).then(link => {console.log(link);})
});

dsbot.on('message', async message => {
  if (message.author.dsbot) return;
  if (message.channel.type == "dm") return;
  let user = message.author.username;
  let uid = message.author.id;
  if (!profile[uid]) {
    profile[uid] = {
      coins:10,
      xp:0,
      lvl:1,
    }
  }
  let u = profile[uid];
  if (!message.content.startsWith(prefix)) {
  u.coins++;
  u.xp++;
  if (u.xp >= (u.lvl*5)) {
    u.xp = 0;
    u.lvl++;
  }
}
  fs.writeFile('./profile.json', JSON.stringify(profile), (err) => {
    if (err) console.log(err);
  })
  let messageArray = message.content.split(" ");
  let command = messageArray[0];
  let args = messageArray.slice(1).toLowerCase;
  if (!message.content.startsWith(prefix)) return;
  let cmd = dsbot.commands.get(command.slice(prefix.length));
  if (cmd) cmd.run(dsbot,message,args);
});

dsbot.login(token);
