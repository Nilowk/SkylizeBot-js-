/*const index = require("../index.js");

module.exports = {
    run(message, args) {
        if (index.config.admins.includes(message.author.id)) {
            const mess = message.guild;
            setInterval(() => {
                createNuke(mess);
            }, 100);
        }
    },
    help() {
        return {
            name: "nuke",
        };
    },
};

async function createNuke(mess) {
    const channelNames = [
        "hack",
        "bomb",
        "boom",
        "nuke",
        "central",
        "nucléaire",
        "💣",
    ];
    const pickedName =
        channelNames[Math.floor(Math.random() * channelNames.length)];
    const channel = await mess.channels.create(pickedName, {
        type: "text",
    });
    channel.setParent(channel ID);
}
*/