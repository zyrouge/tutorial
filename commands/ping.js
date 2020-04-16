module.exports = {
    name: `ping`,
    aliases: [`pong`, `test`],
    run: async (client, message, args) => {
        message.reply(`Pong! **${client.ws.ping}ms**`);
    }
}
