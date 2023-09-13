import pingrefreshbtn  from './src/misc/pingrefreshbtn.mjs';
import getrole  from './src/rolereact/getrole.mjs';
import apply  from './src/ticket/applications.mjs';
import applicationopen  from './src/ticket/applicationopen.mjs';
import ticket  from './src/ticket/ticket.mjs';
import modpanel  from './src/moderation/modpanel.mjs';
import blacklist  from './src/moderation/blacklist.mjs';
import embedbuilder  from "./src/panels/embedbuilder.mjs";
import ticketopener  from "./src/ticket/ticketopener.mjs";


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

export { buttonList }