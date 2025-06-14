require('dotenv').config();
const keep_alive = require('./keep_alive.js');
const { Client, IntentsBitField, InteractionCollector, ApplicationCommandOptionWithChoicesAndAutocompleteMixin } = require('discord.js');

process.on('unhandled Rejection', async (reason, promise) => {
     console.log('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (err) => { 
    console.log('Uncaught Expection: ', err);
});

process.on("uncaughtException Monitor", (err, origin) => { 
    console.log('Uncaught Expection Monitor', err, origin);
});

const client = new Client({
    intents:[
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

client.on('ready', (c) => {
    console.log(`${c.user.tag} is online`);
});

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

client.on('messageCreate', (message) => {
    
    if(message.content.indexOf('!r') == 0){
        if(message.author.bot){
            return;
        }
        let msg = message.content;
        msg = msg.slice(msg.indexOf("r")+1);
        dice(msg,message);
    }
    eastereggs(message);
});

client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand())  return;

    if(interaction.commandName === 'r'){
       let msg = interaction.options.get('mensagem').value;
       dice(msg,interaction);
    }
        
});

function dice(msg, message){
        let reply, endreply = "";
        let neg, sum, mod, bigsum = Number.MIN_VALUE;
        let rest = msg;
        if(rest.indexOf(" ") == 0) rest = rest.slice(rest.indexOf(" ")+1);
        let times = 1;
        if(rest.indexOf("#") != -1){
        times = Number(rest.slice(0, rest.indexOf("#")));
        rest = rest.slice(rest.indexOf("#")+1);       
        }
        msg = rest;
        for(let i = 0; i < times; i++){
            sum = 0;
            mod = 0;
            neg = 0
            rest = msg;
            reply = "";
            while(rest !== ' '){
            if(rest.indexOf("+") == -1 && rest.indexOf("-") == -1){
                if(rest.indexOf("d") == -1){                    
                    if(neg == 1) mod -= Number(rest);
                    else mod += Number(rest);
                }
                else{
                    let ammount = 1;
                if(rest.indexOf("d") > 0) ammount = Number(rest.slice(0, rest.indexOf("d")));
                const faces = Number(rest.slice(rest.indexOf('d')+1));
                reply+= "[";
                for(let i = 0; i < ammount-1; i++){
                let num = getRandomInt(faces)+1; 
                if(num == faces || num == 1) reply+= `** ${num}**,`;
                else reply+= ` ${num},`;
                if(neg == 1) sum-= num;
                    else sum+= num;
                }

                let num = getRandomInt(faces)+1;
                if(num == faces || num == 1) reply+= `** ${num}** ] ${ammount}d${faces} `;
                else reply+= ` ${num} ] ${ammount}d${faces} `;
                if(neg == 1) sum-= num;
                    else sum+= num;
            }
                sum += mod;
                if(sum > bigsum) bigsum = sum;
                if(mod < 0) reply+= `${mod}`;
                if(mod > 0) reply+= `+ ${mod}`;                
                reply = "` " + `${sum}` + " ` ⟵ " + reply +"\n";
                endreply += reply;
                rest = ' ';
                
                
            }
            else{
                let work;
                if(rest.indexOf('+') != -1 && rest.indexOf('+') < rest.indexOf('-') ||  rest.indexOf('-') == -1) work = rest.slice(0, rest.indexOf('+'))
                else work = rest.slice(0, rest.indexOf('-'))
                if(work.indexOf("d") == -1){                    
                    if(neg == 1) mod -= Number(work);
                    else mod += Number(work);
                    if(rest.indexOf('+') != -1 && rest.indexOf('+') < rest.indexOf('-') ||  rest.indexOf('-') == -1){
                        rest = rest.slice(rest.indexOf('+')+1);
                        neg = 0;
                   }
                   else{
                       rest = rest.slice(rest.indexOf('-')+1);
                       neg = 1;
                   }
                }
                else{
                    let ammount = 1;
                    if(rest.indexOf("d") > 0) ammount = Number(rest.slice(0, rest.indexOf("d")));
                    const faces = Number(work.slice(work.indexOf('d')+1));
                    reply+= "[";
                    for(let i = 0; i < ammount-1; i++){
                        let num = getRandomInt(faces)+1;
                        if(num == faces || num == 1) reply+= `** ${num}**,`;
                        else reply+= ` ${num},`;
                        if(neg == 1) sum-= num;
                        else sum+= num;
                        }
                        let num = getRandomInt(faces)+1;
                        if(neg == 1) sum -= num;
                        else sum+= num;
                        if(rest.indexOf('+') != -1 && rest.indexOf('+') < rest.indexOf('-') ||  rest.indexOf('-') == -1){
                             rest = rest.slice(rest.indexOf('+')+1);
                             neg = 0;
                        }
                        else{
                            rest = rest.slice(rest.indexOf('-')+1);
                            neg = 1;
                        }
                        if(num == faces || num == 1) reply+= `** ${num}** ] ${ammount}d${faces} `;
                        else reply+= ` ${num} ] ${ammount}d${faces} `;
                        if(neg == 1 && rest.indexOf("d") != -1) reply += "- ";
                        else if(neg == 0 && rest.indexOf("d") != -1) reply += "+ ";
                        
                }
            }
                
            }
            
        }
        if(isNaN(sum)) return;
        if(endreply.length > 2000){
            if(times == 1) message.reply(`A mensagem passaria do limite de caracteres do discord, mas a soma deu ${bigsum}`);
            else message.reply(`A mensagem passaria do limite de caracteres do discord, mas a maior soma deu ${bigsum}`);
            return;
        }
        message.reply(endreply);
}

function eastereggs(message){
    if(message.guild.id === '985848231260999734') return; //Remove eastereggs no Death Despair
    if (message.content.toLowerCase().indexOf('bale') != -1){
        message.reply('E o Honrado <@680564388834705497>?');
    }
    if (message.content.toLowerCase().indexOf('shinmon') != -1){
        message.reply('Eu comi...');
    }
    if (message.content.toLowerCase().indexOf('gay') != -1 || message.content.toLowerCase().indexOf('boiola') != -1){
        message.reply('Falou em Guilherme?');
    }
    if (message.content.toLowerCase().indexOf('lunee') != -1){
        message.reply('Smt negão 🍔👍');
    }
    if (message.content.toLowerCase().indexOf('bolsonaro') != -1 || message.content.toLowerCase().indexOf('bonoro') != -1){
        message.reply('Based');
        if(message.guild.id === '1034555657736687687') message.reply('https://cdn.discordapp.com/attachments/1228038607428911144/1230939030128951336/0f4cac92-07c6-4335-a510-eeb36cc3a888.png?ex=6635244e&is=6622af4e&hm=a6443325170f22771df138ab95e190528fa466f5e5bf254abc2c69b2e0d8678b&');
    }
    if (message.content.toLowerCase().indexOf('bee') != -1 || message.content.toLowerCase().indexOf('abelha') != -1){
        message.reply('https://open.spotify.com/playlist/6O8wFpsgfGV6yBBur1tbOz?si=bea67af1705445ce');
    }
    if (message.content.toLowerCase().indexOf('faz o l') != -1 || message.content.toLowerCase().indexOf('faiz o eli') != -1 || message.content.toLowerCase().indexOf('faça o l') != -1){
        message.reply('https://cdn.discordapp.com/attachments/1145846578922389536/1224054657622609920/image.png?ex=6625533c&is=6612de3c&hm=1abf8b06934c1ede81cb4ed1eb7ea239561f4e4d63673ef1b50f5a223594a17f&');
    }
    if (message.content.toLowerCase().indexOf('rubens') != -1){
        message.reply('https://cdn.discordapp.com/attachments/1145846578922389536/1228161431107797097/IMG-20240411-WA0037.jpg?ex=662b0977&is=66189477&hm=1f52655c9a537be8b975d7ab3e379b46a43747f6b2ff2ddc00de6c0d12fbe6a2&');
    }
    if (message.content.toLowerCase().indexOf('rapha') != -1){
        message.reply('https://cdn.discordapp.com/attachments/1145846578922389536/1228367471212367944/20240412_123330.gif?ex=662bc95b&is=6619545b&hm=db47424a7f8f6d70fe7d9a4ca46182c7ba6e20d1147b013699d23e61b24bbdb4&');
    }
    if (message.content.toLowerCase().indexOf('call') != -1){
        message.reply('https://tenor.com/view/baki-prison-oliva-piss-baki-son-of-ogre-gif-3428302401975626397');
    }
    if (message.content.toLowerCase() == 'kg' || message.content.toLowerCase().indexOf('danoni') != -1 || message.content.toLowerCase().indexOf('xuxu') != -1){
        message.reply('https://cdn.discordapp.com/attachments/838474017236582440/1241559950396751964/image.png?ex=664aa44f&is=664952cf&hm=5e7a4e06aff3fca4041fe2f9b7d382b9750a3b88ff4cf98766908d39a6471c24&');
    }
    if (message.content.toLowerCase().indexOf('gustavo') != -1 || message.content.toLowerCase().indexOf('guilherme') != -1){
        message.reply('https://cdn.discordapp.com/attachments/1228164941819936809/1228174270547496990/images_-_2024-04-11T234548.358.jpg?ex=662b156c&is=6618a06c&hm=0ade1dc7301b18e9f88cb8553d47c3d1f798bf8c97a99213203f0f8643335f49&');
    }
     if (message.content.toLowerCase().indexOf('vampetada') != -1){
        message.reply('https://cdn.discordapp.com/attachments/1170949826385543178/1301031499155509339/image.png?ex=67264b41&is=6724f9c1&hm=80eeddcfa21132ec5bf00f190634935f5bce41debe10c186f2e397fa25e42ed7&');
    }
     if (message.content.toLowerCase().indexOf('foi de vater') != -1 || message.content.toLowerCase().indexOf('foi de väter') != -1){
        message.reply('https://cdn.discordapp.com/attachments/838474017236582440/1301926239870779515/VaterMarikaAdamus.png?ex=672640cc&is=6724ef4c&hm=06d90d5ed0d2a0b6d901fa59adbd5311bd314360eae7a11b57d2a3feb7003760&');
    }
     if (message.content.toLowerCase().indexOf('rape') != -1){
        message.reply('https://cdn.discordapp.com/attachments/1228359765285933088/1363692452917284976/lUqdEJW.png?ex=684988d0&is=68483750&hm=e8205e10b656656b37ae178cd32ad3f0a08e3c0fb9601b09b10903b09df646c3&');
    }
}
client.login(process.env.TOKEN);
