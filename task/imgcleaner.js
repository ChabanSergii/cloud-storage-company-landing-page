/* Use only recommended task version for good work */
const {src, dest, series}       = require('gulp');


/* Configs */
const path              = require('../config/path.js')
const app               = require('../config/app.js')
const clean = require('gulp-clean')

/* .pipe(src(['app/images/*.{webp,svg}', 'app/images/*.{webp,svg}']))
        .pipe(clean()) */



/* SVG */
function cleanimg() {
    return src(['app/images/*.{webp,svg}', 'app/images/*.{webp,svg}', '!app/images/sprite.svg'])
        .pipe(clean()) 
}


module.exports = cleanimg;