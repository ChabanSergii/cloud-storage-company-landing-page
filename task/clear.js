/* Configs */
const path = require('../config/path.js');


/* Plugins */
const del = require('del');                        /* !!! use only 6.1.1 !!! */
const fs  = require('fs');


/* Del */
function clear() {
    return del(path.root)
}


module.exports = clear;