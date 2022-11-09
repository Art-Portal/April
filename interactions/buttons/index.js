const pingrefreshbtn = require('./src/misc/pingrefreshbtn.js');
const getrole = require('./src/rolereact/getrole.js');
const apply = require('./src/ticket/applications.js');
const applicationopen = require('./src/ticket/applicationopen.js');
const ticket = require('./src/ticket/ticket.js');
const modpanel = require('./src/moderation/modpanel.js');
const blacklist = require('./src/moderation/blacklist.js');
const embedbuilder = require('./src/panels/embedbuilder');
const ticketopener = require('./src/ticket/ticketopener');

const buttonList = {
    "pingrefreshbtn": pingrefreshbtn,
    "getrole": getrole,
    "apply": apply,
    "applicationopen": applicationopen,
    "ticket": ticket,
    "modpanel": modpanel,
    "blacklist": blacklist,
    "embedbuilder": embedbuilder,
    "ticketopener": ticketopener,
}

module.exports = { buttonList }