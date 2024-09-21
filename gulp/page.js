/* Use only recommended task version for good work */
const {src, dest}       = require('gulp');


/* Configs */
const path              = require('../config/path.js')
const app               = require('../config/app.js')


/* Plugins */
const size              = require('gulp-size');                 /* !!! use only 4.0.1 !!! */
const include           = require('gulp-include');
const htmlmin           = require('gulp-htmlmin');
const webpHtml          = require('gulp-webp-html-nosvg');
const replace           = require('gulp-replace');
const typograf          = require('gulp-typograf');


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
        .pipe(
			replace(
				/(?<=src=|href=|srcset=)(['"])(\.(\.)?\/)*(img|images|fonts|css|scss|sass|js|files|audio|video)(\/[^\/'"]+(\/))?([^'"]*)\1/gi,
				'$1./$4$5$7$1'
			)
		)
        .pipe(
			typograf({
				locale: ['ru', 'en-US'],
				htmlEntity: { type: 'digit' },
				safeTags: [
					['<\\?php', '\\?>'],
					['<no-typography>', '</no-typography>'],
				],
			})
		)
        .pipe(dest(path.app))
        .pipe(dest(path.root))
}


module.exports = page;