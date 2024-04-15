require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');

const commands = [
    {
        name: "r",
        description: "Rola dados",
        options: [
            {
                name: 'quantidade',
                description: "Quantidade de dados",
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
            {
                name: 'tipo',
                description: "Somar os dados ou enviar os resultados separadamente",
                type: ApplicationCommandOptionType.Number,
                required: true,
                choices:[
                    {
                        name: 'somar',
                        value: 1,
                    },
                    {
                        name: 'separadamente',
                        value: 0,
                    },
                ],
            },
            {
                name: 'faces',
                description: "Quantidade de faces dos dados",
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
            {
                name: 'modificador',
                description: "Modificador somado ao resultado",
                type: ApplicationCommandOptionType.Number,
            },
        ]
    },
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () =>{
    try{
        console.log('Registering slash comands...');
        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: commands }
        )

        console.log('Slash commands were registered sucessfully');
    }catch (error){
        console.log(`Error: ${error}`)
    }
})();