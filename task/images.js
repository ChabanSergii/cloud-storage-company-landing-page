/* Use only recommended task version for good work */
const {src, dest}       = require('gulp');


/* Configs */
const path              = require('../config/path.js');
const app               = require('../config/app.js');


/* Plugins */
const webp              = require('gulp-webp');                 /* !!! use only 4.0.1 !!! */
const imagemin          = require('gulp-imagemin');             /* !!! use only 7.1.0 !!! {encoding: false} !!!*/
const newer             = require('gulp-newer');                /* exclude re-conversion */
const gulpif            = require('gulp-if');


/* Error notification */
const plumber           = require('gulp-plumber');
const notify            = require('gulp-notify');


/* Images */
function images() {
    return src(path.img.src, {encoding: false})
        .pipe(plumber({
            errorHandler: notify.onError(error => ({
                title: "Images",
                message: error.message
            }))
        }))

        .pipe(newer(path.img.dest))
        .pipe(webp({
            quality: 50,
            method: 6
        }))
        .pipe(dest(path.img.dest))

        .pipe(src(path.img.src, {encoding: false}))
        .pipe(newer(path.img.dest))
        /* .pipe(gulpif(app.isProd, imagemin(app.imagemin))) */
        .pipe(imagemin(app.imagemin))
        .pipe(dest(path.img.dest))

        /* Img for dev */
        .pipe(src(path.svg.srcsvg, { encoding: false }))
        .pipe(newer(path.svg.srcmin))
        .pipe(imagemin(app.imagemin))
        .pipe(dest(path.svg.srcmin))
}


module.exports = images;