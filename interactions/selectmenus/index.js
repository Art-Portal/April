const ticket = require('./src/tickets/ticket.js')
const roleselect = require('./src/rolereact/roleselect.js')
const document = require('./src/misc/document.js')

const selectMenuList = {
    "ticket": ticket,
    "roleselect": roleselect,
    "document": document
}

module.exports = { selectMenuList }