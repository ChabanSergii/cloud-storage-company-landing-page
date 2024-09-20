/* Use only recommended task version for good work */
const {src, dest}       = require('gulp');


/* Configs */
const path              = require('../config/path.js')
const app               = require('../config/app.js')


/* Plugins */
const svgSprite         = require('gulp-svg-sprite');
const clean             = require('gulp-clean')


/* SVG */
function sprite(done) {
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
        
        .pipe(src(path.svg.srcmin, { read: false, encoding: false }))
        .pipe(dest(path.svg.dest))
}


module.exports = sprite;