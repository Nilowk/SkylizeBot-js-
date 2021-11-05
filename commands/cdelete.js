const { help } = require("./ccreate");
const db = require("../config/db.json")
const fs = require("fs")

module.exports = {
    async run(message, args) {
        message.channel.bulkdelete(1)
        if(db.channel[message.author.id] === undefined) return message.channel.send("Vous n'avez pas de channel")
        const channel = message.guild.channels.cache.get(
            db.channel[message.author.id].chan
        );

        if (
            !message.member.hasPermission("MANAGE_MESSAGES") &&
            db.channel[message.author.id] !== message.author.id
        )
            return message.channel.send(
                "Vous n'avez pas la permission de fermer ce salon."
            );
        db.channel[message.author.id] = {};
        fs.writeFileSync("./config/db.json", JSON.stringify(db));
        await message.channel.send(`Le salon ${channel.name} a été fermé !`);
        channel.delete();
    },
    help() {
        return {
            name: "cdelete"
        }
    }
}