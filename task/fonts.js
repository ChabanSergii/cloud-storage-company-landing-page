/* Use only recommended task version for good work */
const {src, dest}       = require('gulp');


/* Configs */
const path              = require('../config/path.js')
const app               = require('../config/app.js')


/* Error notification */
const plumber           = require('gulp-plumber');
const notify            = require('gulp-notify');


/* Plugins */
const fonter            = require('gulp-fonter');
const ttf2woff2         = require('gulp-ttf2woff2');            /* !!! use only 4.0.1 !!! */
const newer             = require('gulp-newer');                /* exclude re-conversion */


/* Fonts */
function fonts() {
    return src(path.fonts.src, { encoding: false, removeBOM: false })
        .pipe(plumber({
            errorHandler: notify.onError(error => ({
                title: 'Fonts',
                message: error.message
            }))
        }))
        .pipe(newer(path.fonts.dest))
        .pipe(fonter(app.fonter))
        .pipe(src(path.fonts.srcttf, { encoding: false, removeBOM: false }))
        .pipe(ttf2woff2())
        /* .pipe(dest(path.fonts.result)) */
        .pipe(dest(path.fonts.dest))
}


module.exports = fonts;