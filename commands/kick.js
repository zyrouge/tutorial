module.exports = {
    name: "kick",
    aliases: [],
    run: async (client, message, args) => {
        const [id, ...reason] = args;
        const member = message.mentions.members.first() || message.guild.members.cache.get(id);
        if(!member) return message.channel.send("Provide a User mention or ID to kick");
        if(!member.kickable) return message.channel.send(`Cannot **kick** ${member}!`);

        member.kick(reason.join(" "))
        .then(() => {
            message.channel.send(`Kicked **${member.user.tag}**`);
        })
        .catch((err) => {
            message.channel.send(`Could not ban **${member.user.tag}**. Reason: \`${err}\``);
        });
    }
}