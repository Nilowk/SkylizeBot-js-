const index = require("../index.js");

module.exports = {
    run(message, args) {
        if (message.member.permissions.has("MANAGE_MESSAGES")) {
            if (message.author.bot) return;

            if (args[0] == undefined) {
                message.channel.bulkDelete(1);
                message.channel.send(
                    "Vous devez choisir un nombre de message à supprimer avec la syntaxe suivante : -clear nombre"
                );
            } else {
                let number = parseInt(args[0]);

                if (isNaN(number)) {
                    message.channel.bulkDelete(1);
                    message.channel.send("Veuillez choisir un nombre valide !");

                } else if (number >= 100) {
                    message.channel.bulkDelete(1);
                    message.channel.send(
                        "Veuillez choisir un nombre entre 1 et 99"
                    );
                } else {
                    message.channel
                        .bulkDelete(number + 1)
                        .then((message) => {
                            console.log(
                                "Suppression de " +
                                    number +
                                    " messages réussi avec succès !"
                            );
                        })
                        .catch((err) => {
                            console.log("Erreur de clear : " + err);
                        });
                } 
            }
        } else {
            message.channel.send(
                "Vous n'avez pas la permission d'utiliser cette commande !"
            );
        }
    },
    help() {
        return {
            name: "clear",
        };
    },
};
