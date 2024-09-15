/* Use only recommended task version for good work */
const {src, dest, series}       = require('gulp');


/* Configs */
const path              = require('../config/path.js');
const app               = require('../config/app.js');


/* Plugins */
const webp              = require('gulp-webp');                 /* !!! use only 4.0.1 !!! */
const imagemin          = require('gulp-imagemin');             /* !!! use only 7.1.0 !!! {encoding: false} !!!*/
const newer             = require('gulp-newer');                /* exclude re-conversion */
const clean             = require('gulp-clean')
const svgSprite         = require('gulp-svg-sprite');
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
            quality: 90,
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

        /* .pipe(src(['app/images/*.webp', '!app/images/*.png'], { read: false, encoding: false  }))
        .pipe(clean()) */
}

function sprite() {
    return src(path.svg.srcsvg, { encoding: false })
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: '../sprite.svg',
                    example: true
                }
            }
        }))
        .pipe(dest(path.svg.srcmin))
        
        .pipe(src(path.svg.srcmin))
        .pipe(dest(path.svg.dest))

        .pipe(src(['app/images/*.svg', '!app/images/sprite.svg'], { read: false, encoding: false  }))
        .pipe(clean())
}

/* function clear() {
    return src('app/images/*.webp', { read: false, encoding: false  })
        .pipe(clean()) 
} */


/* module.exports = series(images, clear); */
module.exports = images;