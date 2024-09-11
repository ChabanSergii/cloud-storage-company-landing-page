/* Use only recommended task version for good work */
const {src, dest}       = require('gulp');


/* Configs */
const path              = require('../config/path.js')
const app               = require('../config/app.js')


/* Plagins */
const size              = require('gulp-size');                 /* !!! use only 4.0.1 !!! */
const include           = require('gulp-include');
const htmlmin           = require('gulp-htmlmin');
const webpHtml          = require('gulp-webp-html-nosvg');


/* Error notification */
const plumber           = require('gulp-plumber');
const notify            = require('gulp-notify');


/* HTML */
function page() {
    return src(path.page.src)
        .pipe(plumber({
            errorHandler: notify.onError(error => ({
                title: "HTML",
                message: error.message
            }))
        }))
        .pipe(
            include({
                includePaths: 'app/pages/components'
        }))
        .pipe(webpHtml())
        .pipe(size({ title: "Before minify" }))
        .pipe(htmlmin(app.htmlmin))
        .pipe(size({ title: "After minify" }))
        .pipe(dest(path.app))
        .pipe(dest(path.root))
}


module.exports = page;