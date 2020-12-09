module.exports = {
    name: "prefix",
    aliases: ["pre"],
    run: async (client, message, args) => {
        const nPrefix = args[0];
        const pPrefix = (await client.database.get(message.guild.id)).value || {};
        if (!nPrefix) return message.channel.send(`Prefix: \`${pPrefix.prefix || client.prefix}\``);
        await client.database.set([message.guild.id, "prefix"], nPrefix);
        message.channel.send(`Prefix changed to \`${nPrefix}\``);
    }
}