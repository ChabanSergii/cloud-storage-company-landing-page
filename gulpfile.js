/* Use only recommended task version for good work */
const {src, dest, watch, parallel, series} = require('gulp');
const browserSync                          = require('browser-sync').create();


/* Configs */
const path      = require('./config/path.js')
const app       = require('./config/app.js')
/* const gp = require("gulp-load-plugins")(); useful plugin for minify code */


/* Plugins */
const clear     = require('./gulp/clear.js')
const pug       = require('./gulp/pug.js')
const page      = require('./gulp/page.js')
const fonts     = require('./gulp/fonts.js')
const images    = require('./gulp/images.js')
const sprite    = require('./gulp/svg.js')
const css       = require('./gulp/css.js')
const scss      = require('./gulp/scss.js')
const scripts   = require('./gulp/scripts.js')
const avifimg   = require('./gulp/avif.js')


/* Launching tasks based on changes */
function watching() {
    browserSync.init({
        server: {
            baseDir: path.app
        }
    });
    watch([path.css.watch], css).on('all', browserSync.reload)
    watch([path.img.watch], images).on('all', browserSync.reload)
    watch([path.fonts.watch], fonts).on('all', browserSync.stream)
    watch([path.js.watch], scripts).on('all', browserSync.reload)
    watch([path.page.app]).on('change', browserSync.reload)                 /* for pug and page tasks */
    watch([path.page.components, path.page.watch], page).on('all', browserSync.reload)
    /* If use SASS */
    /* watch([path.css.watch], scss).on('all', browserSync.reload), */
    /* If use PUG */
    /* watch([path.pug.watch], pug).on('all', browserSync.reload) */
}


/* Constructor */
function building() {
    return src([
        'app/css/style.min.css',
        'app/images/*.{webp,png,avif}',
        'app/images/sprite.svg',
        'app/fonts/*.*',
        'app/js/main.min.js',
        'app/**/*.html',
        '!app/images/stack/sprite.stack.html',
    ], {base : './app'})
        .pipe(dest('./dist'))
}

/* If use SASS */
/* const build = series(
    clear,
    parallel(page, scss, scripts, images, fonts)
); */

const build = series(
    clear,
    parallel(page, css, scripts, images, fonts)
);

const dev   = series(
    build,
    parallel(watching)
);


/* Tasks */
exports.css          = css;
exports.scss         = scss;
exports.avifimg      = avifimg;
exports.images       = images;
exports.sprite       = sprite;
exports.fonts        = fonts;
exports.page         = page;
exports.pug          = pug;
exports.building     = building;
exports.scripts      = scripts;
exports.watching     = watching;
exports.clear        = clear;


/* Project assembly */
/* gulp // gulp --production */
/* npm start // npm run build */
exports.default  = app.isProd
    ? build
    : dev;

