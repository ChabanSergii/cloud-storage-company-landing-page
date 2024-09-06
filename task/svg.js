/* Use only recommended task version for good work */
const {src, dest, series}       = require('gulp');


/* Configs */
const path              = require('../config/path.js')
const app               = require('../config/app.js')


/* Plagins */
const svgSprite         = require('gulp-svg-sprite');
const imagemin          = require('gulp-imagemin');             /* !!! use only 7.1.0 !!! {encoding: false} !!!*/


/* SVG */
function sprite() {
    return src(path.svg.srcsvg, { encoding: false })
        /* .pipe(newer(path.svg.srcmin)) */
        .pipe(imagemin(app.imagemin))
        .pipe(dest(path.svg.srcmin))

        .pipe(src(path.svg.src, { encoding: false }))
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: '../sprite.svg',
                    example: true
                }
            }
        }))
        .pipe(dest(path.svg.srcmin))
}


module.exports = sprite;