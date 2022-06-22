const fs = require('node:fs');

function KickLogger(memberId, memberName, reason) {
    let json = fs.readFileSync("log.json", "utf-8");

    let logs = JSON.parse(json);
    logs["Kicklist"].push({
        memberId,
        memberName,
        reason
    });
    json = JSON.stringify(logs);

    fs.writeFileSync("log.json", json, "utf-8");
}

function InviteLogger(memberId, memberName, adminId, adminName) {
    let json = fs.readFileSync("log.json", "utf-8");

    let logs = JSON.parse(json);
    logs["Invitelist"].push({
        memberId,
        memberName,
        adminId,
        adminName
    });
    json = JSON.stringify(logs);

    fs.writeFileSync("log.json", json, "utf-8");
}

function BanLogger(memberId, memberName, days, reason) {
    let json = fs.readFileSync("log.json", "utf-8");

    let logs = JSON.parse(json);
    logs["Banlist"].push({
        memberId,
        memberName,
        days,
        reason
    });
    json = JSON.stringify(logs);

    fs.writeFileSync("log.json", json, 'utf-8');
}

function UnBanLogger(inputId) {
    let json = fs.readFileSync("log.json", "utf-8");

    let logs = JSON.parse(json);

    for (let i = 0; i < logs["Banlist"].length; i++) { }

    json = JSON.stringify(logs);

    fs.writeFileSync("log.json", json, 'utf-8');
}


module.exports = {
    KickLogger,
    InviteLogger,
    BanLogger,
    UnBanLogger
}
