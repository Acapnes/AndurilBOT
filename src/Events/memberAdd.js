
module.exports = async (message) => {
    if (message.content.startsWith("hi")) {
        message.channel.send("Hello");
    }
}

module.exports.conf = {
    name: "messageCreate"
}