/* Use only recommended task version for good work */
const {src, dest}       = require('gulp');


/* Configs */
const path              = require('../config/path.js');
const app               = require('../config/app.js');


/* Plugins */
const avif              = require('gulp-avif');
const newer             = require('gulp-newer');                /* exclude re-conversion */
const size              = require('gulp-size');                 /* !!! use only 4.0.1 !!! */


/* Error notification */
const plumber           = require('gulp-plumber');
const notify            = require('gulp-notify');


/* Images */
function avifimg() {
    return src([path.img.src, '!./app/images/src/*.svg'], { encoding: false })
        .pipe(plumber({
            errorHandler: notify.onError(error => ({
                title: "Avif img",
                message: error.message
            }))
        }))
        .pipe(size({ title: "Before: " }))
        .pipe(avif({ quality : 85}))
        .pipe(size({ title: "After: " }))
        .pipe(dest(path.img.dest))
}




module.exports = avifimg;