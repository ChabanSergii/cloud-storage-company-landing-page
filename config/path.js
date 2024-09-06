const pathApp = './app';
const pathDist = './dist';


module.exports = {
    app: pathApp,
    root: pathDist,

    page: {
        app: pathApp + '/*.html',
        src: pathApp + '/pages/*.html',
        watch: pathApp + '/pages/**/*.html',
        components: pathApp + '/components/**/*.html',
        dest: pathDist
    },

    pug: {
        src: pathApp + '/pug/*.pug',
        watch: pathApp + '/pug/**/*.pug',
        dest: pathDist
    },

    fonts: {
        src: pathApp + '/fonts/src/*.{eot,ttf,otf,otc,ttc,woff,woff2,svg}',
        watch: pathApp + '/fonts/**/*.{eot,ttf,otf,otc,ttc,woff,woff2,svg}',
        dest: pathDist + '/fonts',
        
        srcttf: pathApp + '/fonts/src/*.ttf',
        result: pathApp + '/fonts',
    },

    css: {
        src: pathApp + '/css/*.css',
        srcapp: pathApp + '/css/',
        watch: pathApp + '/css/**/*.css',
        dest: pathDist + '/css',
        swiper: 'node_modules/swiper/swiper-bundle.css',
    },

    scss: {
        src: pathApp + '/sass/*.{scss,sass}',
        srcapp: pathApp + '/sass/',
        watch: pathApp + '/sass/**/*.{scss,sass}',
        dest: pathDist + '/css',
    },

    js: {
        src: pathApp + '/js/*.js',
        watch: pathApp + '/js/**/*.js',
        dest: pathDist + '/js',
        swiper: './node_modules/swiper/swiper-bundle.js',
    },

    img: {
        src: pathApp + '/images/src/*.{png,jpg,jpeg,gif,svg}',
        watch: pathApp + '/images/**/*.{png,jpg,jpeg,gif,svg}',
        dest: pathDist + '/images',
    },

    svg: {
        srcsvg: pathApp + '/images/src/*.svg',
        srcmin: pathApp + '/images/',
        src: pathApp + '/images/*.svg',
        watch: pathApp + '/images/*.svg',
        dest: pathDist + '/images',
    },
}