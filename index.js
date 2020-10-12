const { Client, Collection } = require("discord.js");
const { token } = require("./config.json");
const fs = require("fs");

const client = new Client();
client.commands = new Collection();
client.aliases = new Collection();

client.on('ready', () => console.log(`I am ready!`));

const init = async () => {
    fs.readdir(`./commands`, (err, files) => {
        if(err) return console.error(err);
        files.forEach(file => {
            const props = require(`./commands/${file}`);
            client.commands.set(props.name, props);
            props.aliases.forEach(alias => client.aliases.set(alias, props.name));
            console.log(`Loaded ${file}`);
        })
    });
};

init();

client.on('message', (message) => {
    if(message.author.bot) return;
    const prefix = `,`;
    if(message.content.indexOf(prefix) !== 0) return;
    const args = message.content.slice(prefix.length).split(" ");
    const command = args.shift().toLowerCase();
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
    if(cmd) cmd.run(client, message, args);
});

client.login(token);