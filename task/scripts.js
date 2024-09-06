/* Use only recommended task version for good work */
const {src, dest} = require('gulp');


/* Configs */
const path              = require('../config/path.js');
const app               = require('../config/app.js');


/* Plugins */
const concat            = require('gulp-concat');
const uglify            = require('gulp-uglify-es').default;
const size              = require('gulp-size');                 /* !!! use only 4.0.1 !!! */
const babel             = require('gulp-babel');
const webpack           = require('webpack-stream');


/* Error notification */
const plumber           = require('gulp-plumber');
const notify            = require('gulp-notify');


/* JavaScript */
function scripts() {
    return src([path.js.src], { sourcemaps: app.isDev })
        .pipe(plumber({
            errorHandler: notify.onError(error => ({
                title: "JavaScript",
                message: error.message
            }))
        }))
        /* .pipe(concat('main.min.js')) */
        .pipe(babel())
        .pipe(size({ title: "Before uglify" }))
        .pipe(webpack(app.webpack))
        /* .pipe(uglify()) возможно удалить???*/
        .pipe(size({ title: "After uglify" }))
        .pipe(dest(path.js.dest, { sourcemaps: app.isDev }))
}


module.exports = scripts;