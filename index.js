const { Client, Collection } = require("discord.js");
const { token } = require("./config.json");
const fs = require("fs");
const { Keyvify } = require("keyvify");

const client = new Client();
client.commands = new Collection();
client.aliases = new Collection();
client.prefix = ",";
client.database = Keyvify("guilddatabase", {
    dialect: "better-sqlite",
    storage: `${__dirname}/data/database.sqlite`
});

client.on('ready', async () => {
    console.log(`I am ready!`);
    await client.database.connect();
});

const init = async () => {
    fs.readdir(`./commands`, (err, files) => {
        if (err) return console.error(err);
        files.forEach(file => {
            const props = require(`./commands/${file}`);
            client.commands.set(props.name, props);
            props.aliases.forEach(alias => client.aliases.set(alias, props.name));
            console.log(`Loaded ${file}`);
        })
    });
};

init();

client.on('message', async (message) => {
    if (message.author.bot) return;
    const gConfig = (await client.database.get(message.guild.id)).value || {};
    const prefix = gConfig.prefix || client.prefix;
    if (message.content.indexOf(prefix) !== 0) return;
    const args = message.content.slice(prefix.length).split(" ");
    const command = args.shift().toLowerCase();
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
    if (cmd) cmd.run(client, message, args);
});

client.login(token);