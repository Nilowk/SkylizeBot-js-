const index = require("../index.js")
const db = require("../config/db.json")
const config = require("../config/config.json")
const fs = require("fs")

module.exports = {
    async run(message, args) {
        message.channel.bulkDelete(1)
        if (args[0] === undefined) {
            message.channel.send("merci de définir le nom du channel");
        } else {
            if (
                db.channel[message.author.id] !== undefined &&
                !isEmpty(db.channel[message.author.id])
            ) {
                return message.channel.send("Vous avez déjà un channel à vous");
            } else {
                const channel = await message.guild.channels.create(
                    `${args.join(" ")}`,
                    {
                        type: "voice",
                        parent: config.channel.category,
                        permissionOverwrites: [
                            {
                                id: message.author.id,
                                allow: "MOVE_MEMBERS",
                            },
                            ...config.channel.roles.map((id) => ({
                                id,
                                allow: "MOVE_MEMBERS",
                            })),
                        ],
                    }
                );
                db.channel[message.author.id] = {
                    chan: channel.id,
                };
                fs.writeFileSync("./config/db.json", JSON.stringify(db));
                message.channel.send(
                    `Votre channel ${args.join(" ")} a été créé !`
                );
            }
        }
    },
    help() {
        return {
            name: "ccreate"
        }
    }
}

function isEmpty(obj) {
    for (let prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            return false;
        }
    }
    return JSON.stringify(obj) === JSON.stringify({});
}