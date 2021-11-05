///////////////////////////////////////
//////////////LES BASES////////////////
///////////////////////////////////////

const Discord = require("discord.js");

const Client = new Discord.Client();

const prefix = "-";

const config = require("./config/config.json");

const db = require("./config/db.json");

const fs = require("fs");
const { createBrotliCompress } = require("zlib");

Client.login(config.token);

let commands = {};

Client.on("ready", () => {
    loadCommands();
    console.log("bot ok");
});

Client.on("message", (message) => {
    if (!message.content.startsWith(prefix)) return;
    let args = message.content.split(" ");
    let cmdname = args.shift();
    cmdname = cmdname.slice(prefix.length);
    if (!(cmdname in commands)) return;
    const cmd = commands[cmdname];
    cmd.run(message, args);
});

require("./utils/stats.js").register(Client)

//////////////////////////////////////////////////
//////////////Arrivée et départ(message)//////////
//////////////////////////////////////////////////

Client.on("guildMemberAdd", (member) => {
    let WelcomeChannel = Client.channels.cache.get("794584761007734784");
    WelcomeChannel.send(
        `${member}` +
            " a rejoint le serveur, Nous sommes désormais " +
            (member.guild.memberCount -= member.user.bot) +
            " citoyen dans cette ville, merci a toi ! 🎉"
    );
});

Client.on("guildMemberRemove", (member) => {
    let quitteChannel = Client.channels.cache.get("794584761007734784");
    quitteChannel.send(`${member}` + " a quitté le serveur... 😢");
});


/////////////////////////////////////////////////
///////////////////-NEW//////////////////////////
/////////////////////////////////////////////////

Client.on("message", async (message) => {
    if (message.content === prefix + "new") {
        if (
            Object.values(db.tickets).some(
                (ticket) => ticket.author === message.author.id
            )
        )
            return message.channel.send("Vous avez déjà un ticket d'ouvert.");
        const channel = await message.guild.channels.create(
            `ticket ${message.author.username}`,
            {
                type: "text",
                parent: config.ticket.category,
                permissionOverwrites: [
                    {
                        id: message.guild.id,
                        deny: "VIEW_CHANNEL",
                    },
                    {
                        id: message.author.id,
                        allow: "VIEW_CHANNEL",
                    },
                    ...config.ticket.roles.map((id) => ({
                        id,
                        allow: "VIEW_CHANNEL",
                    })),
                ],
            }
        );
        db.tickets[channel.id] = {
            author: message.author.id,
        };
        fs.writeFileSync("./config/db.json", JSON.stringify(db));
        channel.send(
            new Discord.MessageEmbed().setDescription(
                `Bonjour ${message.member}, bienvenue dans votre ticket. Nous allons nous occuper de vous.`
            )
        );
        message.channel.send(`Votre ticket ${channel} a été créé !`);
    }
});

/////////////////////////////////////////
///////////////-CLOSE////////////////////
/////////////////////////////////////////

Client.on("message", async (message) => {
    if (message.content === prefix + "close") {
        const channel = message.mentions.channels.first() || message.channel;
        if (!db.tickets[channel.id])
            return message.channel.send("Ce salon n'est pas un ticket.");
        if (
            !message.member.hasPermission("MANAGE_MESSAGES") &&
            db.tickets[channel.id].author !== message.author.id
        )
            return message.channel.send(
                "Vous n'avez pas la permission de fermer ce ticket."
            );
        delete db.tickets[channel.id];
        fs.writeFileSync("./config/db.json", JSON.stringify(db));
        await message.channel.send(`Le ticket ${channel.name} a été fermé !`);
        channel.delete();
    }
});

/////////////////////////////////////////////////
///////////////////-RULES////////////////////////
/////////////////////////////////////////////////

Client.on("message", (message) => {
    if (message.content == prefix + "rules") {
        message.channel.bulkDelete(1);
        var embed = new Discord.MessageEmbed()
            .setAuthor("Skylize RP", "https://i.postimg.cc/g2QYSZr3/logo.png")
            .setTitle("**Règlement :**")
            .addField(
                "**:smiley: 1.Comportement**",
                "Soyez courtois et civilisé."
            )
            .addField(
                "**:abc: 2.Orthographe**",
                "Une écriture française correcte est exigée."
            )
            .addField(
                "**:anger_right: 3.Contenu des messages**",
                "Aucun contenu raciste, sexiste ou autre offense ne sera toléré."
            )
            .addField(
                "**:incoming_envelope: 4.Message**",
                "Le spam / flood est interdit."
            )
            .addField(
                "**:no_bell: 5.Message privé**",
                "Veuillez ne pas mentionner ou envoyer un message directement aux membres du staff. Les ticket sont là pour ça. En cas d'achat vous avez l'autotrisation de contacter Nilowk par message privé"
            )
            .addField(
                "**:card_index: 6.Pseudo**",
                "utilisez un nom et un avatar appropriés."
            )
            .addField(
                "**:loudspeaker: 7.Pub**",
                "ne faites pas de pub pour un autre serveur (Discord / FiveM) sauf si vous avez une autorisation"
            )
            .addField(
                "**:head_bandage: 8.Harcèlement**",
                "Aucun harcèlement, abus ou intimidation ne sera toléré."
            )
            .addField(
                "**:classical_building: 9.Sujets interdit**",
                "Afin de garantir une bonne entante entre chaque personne evitez les sujets politiques ou religieux"
            )
            .addField(
                "**:mute: 10.Comportement en vocal**",
                "Dans un environement bruyant, respectez tout le monde en utilisant le push to talk au besoin."
            )
            .addField(
                "**:thinking: 11.Bon sens**",
                "Les règles ne sont pas exhaustives. Veuillez faire preuve de bon sens."
            )
            .setImage("https://i.postimg.cc/sghKYVRm/unknown.png")
            .setFooter("By Nilowk")
            .setTimestamp();
        message.channel.send(embed);
    }
});

function loadCommands() {
    commands = {};
    fs.readdir("commands", (error, files) => {
        if (error) {
            throw error;
        }
        files.forEach((file) => {
            let cmd = require(`./commands/${file}`);
            if(!cmd.help) return
            commands[cmd.help().name] = cmd;
        });
    });
}

module.exports = {
    Client: Client,
    prefix: prefix,
    db: db,
    config: config,
};

