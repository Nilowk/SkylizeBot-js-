const Discord = require("discord.js")

const Client = new Discord.Client();

module.exports = {
    run(message, args) {
        if (message.member.permissions.has("ADMINISTRATOR")) {
            let arg = message.content.split("]")
            console.log(arg) 
            if (arg[1] === undefined) {
                message.channel.bulkDelete(1);
                message.channel.send(
                    "merci de définir correctement le message avec la syntaxe suivante : -annonce ]type]message]channelID"
                );
            } else if (arg[2] === undefined) {
                message.channel.bulkDelete(1);
                message.channel.send(
                    "merci de définir correctement le message avec la syntaxe suivante : -annonce ]type]message]channelID"
                );
            } else if(arg[3] === undefined){
                message.channel.bulkDelete(1);
                var embed = new Discord.MessageEmbed()
                    .setAuthor(
                        "Skylize RP",
                        "https://i.postimg.cc/g2QYSZr3/logo.png"
                    )
                    .setTitle("**" + arg[1] + "**")
                    .setDescription(arg[2])
                    .setImage("https://i.postimg.cc/Y9nBhjVX/unknown.png")
                    .setFooter("By Nilowk")
                    .setTimestamp();
                message.channel.send("@everyone", embed);
            } else {
                message.channel.bulkDelete(1);
                let annonceChannel = Client.channels.cache.get(arg[3]);
                var embed = new Discord.MessageEmbed()
                    .setAuthor(
                        "Skylize RP",
                        "https://i.postimg.cc/g2QYSZr3/logo.png"
                    )
                    .setTitle("**" + arg[1] + "**")
                    .setDescription(arg[2])
                    .setImage("https://i.postimg.cc/Y9nBhjVX/unknown.png")
                    .setFooter("By Nilowk")
                    .setTimestamp();
                annonceChannel.send("@everyone", `${embed}`);
            }
            console.log(arg)
        } else {
            message.channel.bulkDelete(1);
            message.channel.send(
                "Vous n'avez pas la permission d'utiliser cette commande"
            );
        }
    },
    help() {
        return {
            name: "annonce"
        }
    }
}