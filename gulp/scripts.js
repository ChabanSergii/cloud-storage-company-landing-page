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


/* JavaScript 1.0*/
function scripts1() {
    return src([path.js.src], { sourcemaps: app.isDev })
        .pipe(plumber({
            errorHandler: notify.onError(error => ({
                title: "JavaScript",
                message: error.message
            }))
        }))
        /* .pipe(concat('main.min.js')) */
        .pipe(babel()) /* транспилирует новый js code в старый */
        .pipe(size({ title: "Before uglify" }))
        .pipe(webpack(app.webpack))
        /* .pipe(uglify()) возможно удалить???*/
        .pipe(size({ title: "After uglify" }))
        .pipe(dest(path.js.dest, { sourcemaps: app.isDev }))
}

/* JavaScript 2.0*/
function scripts2() {
    return src([path.js.src], { sourcemaps: app.isDev })
        .pipe(plumber({
            errorHandler: notify.onError(error => ({
                title: "JavaScript",
                message: error.message
            }))
        }))
        .pipe(babel()) /* транспилирует новый js code в старый */
        .pipe(webpack(require('../config/webpack.config.js')))
        .pipe(dest(path.js.dest, { sourcemaps: app.isDev }))
        .pipe(dest(path.js.srcapp, { sourcemaps: app.isDev }))
}


module.exports = scripts2;