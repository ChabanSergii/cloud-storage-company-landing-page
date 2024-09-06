/* Configs */
const path = require('../config/path.js')


/* Plagins */
const del = require('del')                        /* !!! use only 6.1.1 !!! */


/* Del */
function clear() {
    return del(path.root)
}


module.exports = clear;