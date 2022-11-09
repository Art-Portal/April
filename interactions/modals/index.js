const command = require('./src/tickets/command.js');
const partnershipmodal = require('./src/tickets/partnership.js');
const reportmodal = require('./src/tickets/report.js');
const application = require('./src/tickets/application.js');
const modmodal = require('./src/moderation/modmodal.js');
const blacklist = require('./src/moderation/blacklist.js');
const embedbuilder = require('./src/embedbuilder/embedbuilder');

const modalList = {
    "command": command,
    "partnershipmodal": partnershipmodal,
    "reportmodal": reportmodal,
    "application": application,
    "blacklist": blacklist,
    "modmodal": modmodal,
    "embedbuilder": embedbuilder,
}

module.exports = { modalList }