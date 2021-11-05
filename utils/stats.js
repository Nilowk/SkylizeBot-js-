//En ligne
let chanId = undefined;

//Membre
let chaId = undefined;

//Bots
let channId = undefined;

//Citoyens
let channeId = undefined;

const index = require("../index.js");

module.exports = {
    register(Client) {
        Client.on("ready", async () => {
            const myguild = await Client.guilds.fetch("793504580217339974");

            const category = await myguild.channels.cache.get(
                "812301065696837633"
            );
            category.children.filter((channel) => channel.delete());

            //membre
            const countmembers = getCountmembers(myguild);
            await regenerateCountMembersChannel(myguild, countmembers);

            //bot
            const countbot = getCountbot(myguild);
            await regenerateCountbotsChannel(myguild, countbot);

            //citoyen
            const countcitoyens = getCountCitoyens(myguild);
            await regenerateCountCitoyenChannel(myguild, countcitoyens);

            //en ligne
            const count = getUserCountOnline(myguild);
            await regenerateOnlineChannel(myguild, count, Client);
        });

        ///////////////////////////////////////////////
        /////////////Statistique server////////////////
        ///////////////////////////////////////////////

        Client.on("guildMemberAdd", async (member) => {
            const newmember = member.guild;
            const countmembers = getCountmembers(newmember);
            await regenerateCountMembersChannel(newmember, countmembers);
        });

        Client.on("guildMemberRemove", async (member) => {
            const newmember = member.guild;
            const countmembers = getCountmembers(newmember);
            await regenerateCountMembersChannel(newmember, countmembers);
        });

        //////////////////////////////////////////////
        //////////////Statistique bots////////////////
        //////////////////////////////////////////////

        Client.on("guildMemberAdd", async (member) => {
            const nwmember = member.guild;
            const countbots = getCountbot(nwmember);
            await regenerateCountbotsChannel(nwmember, countbots);
        });

        Client.on("guildMemberRemove", async (member) => {
            const nwmember = member.guild;
            const countbots = getCountbot(nwmember);
            await regenerateCountbotsChannel(nwmember, countbots);
        });

        ///////////////////////////////////////////////
        /////////////Statistique citoyens////////////////
        ///////////////////////////////////////////////

        Client.on("guildMemberAdd", async (member) => {
            const nmember = member.guild;
            const countcitoyens = getCountCitoyens(nmember);
            await regenerateCountCitoyenChannel(nmember, countcitoyens);
        });

        Client.on("guildMemberRemove", async (member) => {
            const nmember = member.guild;
            const countcitoyens = getCountCitoyens(nmember);
            await regenerateCountCitoyenChannel(nmember, countcitoyens);
        });

        //////////////////////////////////////////////
        //////////////Statistique en ligne////////////
        //////////////////////////////////////////////

        Client.on("presenceUpdate", async (oldPresence, newPresence) => {
            const guild = newPresence.guild;
            const count = getUserCountOnline(guild);
            await regenerateOnlineChannel(guild, count, Client);
        });
    },
};

function getUserCountOnline(myguild) {
    return myguild.members.cache.filter(
        (member) => member.presence.status !== "offline"
    ).size;
}

async function regenerateOnlineChannel(guild, count, Client) {
    const c = guild.channels.cache.get(chanId);
    let totbots = (
        await Client.guilds.fetch("793504580217339974")
    ).members.cache.filter((member) => member.user.bot).size;
    let calcule = count - totbots;
    if (c !== undefined) {
        await c.delete();
    }
    const channel = await guild.channels.create(
        `📌En ligne : ${calcule} citoyens`,
        {
            type: "voice",
        }
    );
    channel.setParent("812301065696837633");
    chanId = channel.id;
}

function getCountCitoyens(myguild) {
    return myguild.members.cache.size;
}

async function regenerateCountCitoyenChannel(nmember, countcitoyens) {
    const a = nmember.channels.cache.get(channeId);
    let sizebot = nmember.members.cache.filter((member) => member.user.bot)
        .size;
    let calcule2 = countcitoyens - sizebot;
    if (a !== undefined) {
        await a.delete();
    }
    const channel = await nmember.channels.create(
        `🧑citoyen : ${calcule2} citoyens`,
        {
            type: "voice",
        }
    );
    channel.setParent("812301065696837633");
    channeId = channel.id;
}

function getCountbot(myguild) {
    return myguild.members.cache.filter((member) => member.user.bot).size;
}

async function regenerateCountbotsChannel(nwmember, countbots) {
    const a = nwmember.channels.cache.get(channId);
    if (a !== undefined) {
        await a.delete();
    }
    const channel = await nwmember.channels.create(
        `🤖Bot : ${countbots} bots`,
        {
            type: "voice",
        }
    );
    channel.setParent("812301065696837633");
    channId = channel.id;
}

function getCountmembers(myguild) {
    return myguild.members.cache.size;
}

async function regenerateCountMembersChannel(newmember, countmembers) {
    const a = newmember.channels.cache.get(chaId);
    if (a !== undefined) {
        await a.delete();
    }
    const channel = await newmember.channels.create(
        `📈Membre : ${countmembers} membres`,
        {
            type: "voice",
        }
    );
    channel.setParent("812301065696837633");
    chaId = channel.id;
}
