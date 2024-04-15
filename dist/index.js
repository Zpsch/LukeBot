require('dotenv').config();
const { Client, IntentsBitField, InteractionCollector } = require('discord.js');

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
    if (message.content.toLowerCase().indexOf('bale') != -1){
        message.reply('E o Honrado <@680564388834705497>?');
    }
    if (message.content.toLowerCase().indexOf('shinmon') != -1){
        message.reply('Eu comi...');
    }
    if (message.content.toLowerCase().indexOf('gay') != -1 ){
        message.reply('Falou em Guilherme?');
    }
    if (message.content.toLowerCase().indexOf('lunee') != -1){
        message.reply('Smt negão 🍔👍');
    }
    if (message.content.toLowerCase().indexOf('bolsonaro') != -1 || message.content.toLowerCase().indexOf('bonoro') != -1){
        message.reply('Based');
    }
    if (message.content.toLowerCase().indexOf('bee') != -1 || message.content.toLowerCase().indexOf('abelha') != -1){
        message.reply('https://open.spotify.com/playlist/6O8wFpsgfGV6yBBur1tbOz?si=bea67af1705445ce');
    }
    if (message.content.toLowerCase().indexOf('faz o l') != -1 || message.content.toLowerCase().indexOf('faiz o eli') != -1){
        message.reply('https://cdn.discordapp.com/attachments/1145846578922389536/1224054657622609920/image.png?ex=6625533c&is=6612de3c&hm=1abf8b06934c1ede81cb4ed1eb7ea239561f4e4d63673ef1b50f5a223594a17f&');
    }
    if (message.content.toLowerCase().indexOf('rubens') != -1){
        message.reply('https://cdn.discordapp.com/attachments/1145846578922389536/1228161431107797097/IMG-20240411-WA0037.jpg?ex=662b0977&is=66189477&hm=1f52655c9a537be8b975d7ab3e379b46a43747f6b2ff2ddc00de6c0d12fbe6a2&');
    }
    if (message.content.toLowerCase().indexOf('gustavo') != -1 || message.content.toLowerCase().indexOf('guilherme') != -1){
        message.reply('https://cdn.discordapp.com/attachments/1228164941819936809/1228174270547496990/images_-_2024-04-11T234548.358.jpg?ex=662b156c&is=6618a06c&hm=0ade1dc7301b18e9f88cb8553d47c3d1f798bf8c97a99213203f0f8643335f49&');
    }
    if (message.content.toLowerCase().indexOf('rapha') != -1){
        message.reply('https://cdn.discordapp.com/attachments/1145846578922389536/1228367471212367944/20240412_123330.gif?ex=662bc95b&is=6619545b&hm=db47424a7f8f6d70fe7d9a4ca46182c7ba6e20d1147b013699d23e61b24bbdb4&');
    }
    if (message.content.toLowerCase().indexOf('call') != -1){
        message.reply('https://tenor.com/view/baki-prison-oliva-piss-baki-son-of-ogre-gif-3428302401975626397');
    }
});

client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand())  return;

    if(interaction.commandName === 'r'){
        let reply = "";
        let sum = 0;
        const tipo = interaction.options.get('tipo').value;
        const ammount = interaction.options.get('quantidade').value;
        const faces = interaction.options.get('faces').value;
        const mod = interaction.options.get('modificador')?.value;
        if (tipo == 0){
        if (mod == undefined){
        for(let i = 0; i < ammount; i++){
            let num = getRandomInt(faces)+1;
            if(num == faces || num == 1){
                reply+= `**${num}  ⟵ [${num}] d${faces}**\n`;
            }
            else{
                reply+= `${num}  ⟵ [${num}] d${faces}\n`;
        }

        }}
        else{
            for(let i = 0; i < ammount; i++){
            let num = getRandomInt(faces)+1;
            if(num == faces || num == 1){
                reply+= `**${num+mod}  ⟵ [${num}] d${faces} + ${mod}**\n`;
            }
            else{
            reply+= `${num+mod}  ⟵ [${num}] d${faces} + ${mod}\n`;
            }

        }}

        if(reply.length > 2000){
            interaction.reply("A mensagem passaria do limite de caracteres do discord");
            return;
        }


        interaction.reply(reply);
    }
else{
    for(let i = 0; i < ammount-1; i++){
        let num = getRandomInt(faces)+1;
        reply+= ` ${num},`;
        sum+= num;
    }
    let num = getRandomInt(faces)+1;
    reply+= ` ${num} `;
    sum+= num;
    if(mod == undefined){
        reply= `${sum}  ⟵` + '[' + reply + '] ' + `${ammount}d${faces}`;
        if(reply.length > 2000){
            interaction.reply(`A mensagem passaria do limite de caracteres do discord, mas a soma deu ${sum}`);
            return;
        }
        interaction.reply(reply);
    }
    else{
        reply = `${sum+mod}  ⟵` + '[' + reply + '] ' + `${ammount}d${faces} + ${mod}`;
        if(reply.length > 2000){
            interaction.reply(`A mensagem passaria do limite de caracteres do discord, mas a soma deu ${sum+mod}`);
            return;
        }
        interaction.reply(reply);
    }
}
}});

client.login(process.env.TOKEN);