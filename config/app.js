/* При запуске команды с флагом '--production' в переменную isProd запишется True,
 а во всех остальных случаях False */

const isProd = process.argv.includes('--production');
const isDev = !isProd;


module.exports = {
    isProd: isProd,
    isDev: isDev,

    htmlmin: {
        collapseWhitespace: isProd
    },

    pug: {
        pretty: isDev,
        data: {
            news: require('../package.json')
        }
    },

    webpack: {
        mode: isProd ? 'production' : 'development'
    },

    imagemin: {
        verbose: true
    },

    fonter:{
        subset: [66, 67, 68, 69, 70, 71],
        formats: ['woff', 'ttf']
    },

}
