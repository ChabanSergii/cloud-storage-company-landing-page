/* Use only recommended task version for good work */
const {src, dest, watch, parallel, series} = require('gulp');
const browserSync       = require('browser-sync').create();


/* Configs */
const path              = require('./config/path.js')
const app               = require('./config/app.js')
const clean             = require('gulp-clean');
/* const gp = require("gulp-load-plugins")(); полезный плагин для уменьшения кода */


/* Plugins */
const clear = require('./task/clear.js')
const pug = require('./task/pug.js')
const page = require('./task/page.js')
const fonts = require('./task/fonts.js')
const images = require('./task/images.js')
const sprite = require('./task/svg.js')
const scss = require('./task/scss.js')
const scripts = require('./task/scripts.js')
const avifimg = require('./task/avif.js')


/* Launching tasks based on changes */
function watching() {
    browserSync.init({
        server: {
            baseDir: path.app
        }
    });
    watch([path.scss.watch], scss).on('all', browserSync.stream)
    watch([path.img.watch], images).on('all', browserSync.reload)
    watch([path.fonts.watch], fonts).on('all', browserSync.stream)
    watch([path.js.watch], scripts).on('all', browserSync.reload)
    watch([path.pug.watch], pug).on('all', browserSync.reload)
    watch([path.page.app]).on('change', browserSync.reload)                 /* for pug and page */
    /* watch([path.page.components, path.page.watch], pages) */
}


/* Зачем это */
function cleanDist() {
    return src('dist')
        .pipe(clean())
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

const build = series(
    clear,
    parallel(pug, scss, scripts, images, fonts)
);

const dev   = series(
    build,
    parallel(watching)
);


/* Tasks */
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
exports.cleanDist    = cleanDist;
exports.clear        = clear;


/* Project assembly */
/* gulp // gulp --production */
/* npm start // npm run build */
exports.default  = app.isProd
    ? build
    : dev;


/* 
Steps:
- gulp images
- gulp avifimg
- gulp sprite
*/