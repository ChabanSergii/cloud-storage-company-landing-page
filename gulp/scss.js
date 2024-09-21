/* Use only recommended task version for good work */
const {src, dest}       = require('gulp');


/* Configs */
const path              = require('../config/path.js')
const app               = require('../config/app.js')


/* Error notification */
const plumber           = require('gulp-plumber');
const notify            = require('gulp-notify');


/* Plugins */
const autoprefixer      = require('gulp-autoprefixer');         /* !!! use only 8.0.0 !!! */
const csso              = require('gulp-csso');
const size              = require('gulp-size');                 /* !!! use only 4.0.1 !!! */
const rename            = require('gulp-rename');
const shorthand         = require('gulp-shorthand');
const scssMedia         = require('gulp-group-css-media-queries');
const sass              = require('gulp-sass')(require('sass'));
const sassGlob          = require('gulp-sass-glob');
const webpCss           = require('gulp-webp-css');
const replace           = require('gulp-replace');


const plumberScssConfig = {
    errorHandler: notify.onError(error => ({
        title: "SCSS",
        message: '<%= error.message %>',
        sound: true
    }))
}


/* SCSS */
function scss() {
    return src(path.scss.src, { sourcemaps: app.isDev })
        .pipe(plumber(plumberScssConfig))
        .pipe(sassGlob())
        .pipe(sass())
        .pipe(webpCss())
        .pipe(autoprefixer())
        .pipe(shorthand())
        .pipe(scssMedia())
        .pipe(size({ title: "main.css" }))
        .pipe(
			replace(
				/(['"]?)(\.\.\/)+(img|images|fonts|css|scss|sass|js|files|audio|video)(\/[^\/'"]+(\/))?([^'"]*)\1/gi,
				'$1$2$3$4$6$1'
			)
		)
        .pipe(dest(path.scss.dest, { sourcemaps: app.isDev }))
        .pipe(dest(path.scss.srcapp, { sourcemaps: app.isDev }))
        .pipe(rename({ suffix: ".min" }))
        .pipe(csso())
        .pipe(size({ title: "main.min.css" }))
        .pipe(dest(path.scss.srcapp, { sourcemaps: app.isDev }))
        .pipe(dest(path.scss.dest, { sourcemaps: app.isDev }))
}


module.exports = scss;