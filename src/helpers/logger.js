const fs = require('node:fs');

function KickLogger(memberId, memberName) {
    let json = fs.readFileSync("log.json", "utf-8");

    let logs = JSON.parse(json);
    logs["Kicklist"].push({
        id: memberId,
        name: memberName
    });
    json = JSON.stringify(logs);

    fs.writeFileSync("log.json", json, "utf-8");
}


module.exports = {
    KickLogger
}
