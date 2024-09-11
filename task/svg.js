/* Use only recommended task version for good work */
const {src, dest, series}       = require('gulp');


/* Configs */
const path              = require('../config/path.js')
const app               = require('../config/app.js')
const clean = require('gulp-clean')


/* Plagins */
const svgSprite         = require('gulp-svg-sprite');


/* SVG */
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
        .pipe(dest(path.svg.dest))
}


module.exports = sprite;