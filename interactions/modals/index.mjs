import command  from './src/tickets/command.mjs';
import partnershipmodal  from './src/tickets/partnership.mjs';
import reportmodal  from './src/tickets/report.mjs';
import application  from './src/tickets/application.mjs';
import modmodal  from './src/moderation/modmodal.mjs';
import blacklist  from './src/moderation/blacklist.mjs';
import embedbuilder  from "./src/embedbuilder/embedbuilder.mjs";







const modalList = {
    "command": command,
    "partnershipmodal": partnershipmodal,
    "reportmodal": reportmodal,
    "application": application,
    "blacklist": blacklist,
    "modmodal": modmodal,
    "embedbuilder": embedbuilder,
}

export { modalList }