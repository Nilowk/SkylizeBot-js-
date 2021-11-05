const index = require("../index.js");

const Discord = require("discord.js")

module.exports = {
    run(message, args) {
        message.channel.bulkDelete(1);
        var embed = new Discord.MessageEmbed()
            .setAuthor("Skylize RP", "https://i.postimg.cc/g2QYSZr3/logo.png")
            .setTitle("**liste des commandes :**")
            .addField(
                "**-help**",
                "cette commande permet de lister les commandes et leur utiliter"
            )
            .addField(
                "**-rules**",
                "cette commande permet de voir le règlement si nécéssaire"
            )
            .addField(
                "**-ccreate**",
                "cette commande permet de crée votre propre salon vocal"
            )
            .addField(
                "**-cdelete**",
                "cette commande permet de supprimer votre salon vocal"
            )
            .addField(
                "**-cconfig**",
                "cette commande permet de voir toutes les possibilités de config de votre salon vocal"
            )
            .addField(
                "**-play lien_youtube**",
                "cette commande permet de jouer une musique de youtube grace à un lien"
            )
            .addField(
                "**-new**",
                "cette commande permet de crée un ticket en cas de question où de proposition"
            )
            .addField(
                "**-close**",
                "cette commande permet de fermer un ticket"
            )
            .addField(
                "***-clear nombre***",
                "réserver au modo, cette commande permet de supprimer un nombre de messages compris entre 1 et 99"
            )
            .addField(
                "***-annonce ]type]message]channelID***",
                "réserver au admin, cette commande permet de faire une annonce Stylisé"
            )
            .setFooter("By Nilowk")
            .setTimestamp();
        message.channel.send(embed);
    },
    help() {
        return {
            name: "help",
        };
    },
};
