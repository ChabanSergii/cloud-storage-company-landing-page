/* Use only recommended task version for good work */
const {src, dest}       = require('gulp');


/* Configs */
const path              = require('../config/path.js')
const app               = require('../config/app.js')


/* Plugins */
const pugs              = require('gulp-pug');
const webpHtml          = require('gulp-webp-html');


/* Error notification */
const plumber           = require('gulp-plumber');
const notify            = require('gulp-notify');


/* HTML PUG*/
function pug() {
    return src(path.pug.src)
        .pipe(plumber({
            errorHandler: notify.onError(error => ({
                title: "Pug",
                message: error.message
            }))
        }))
        .pipe(pugs(app.pug))
        .pipe(webpHtml())
        .pipe(dest(path.app))
        .pipe(dest(path.root))
}


module.exports = pug;