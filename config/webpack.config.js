const config = {
    mode: 'production',
    entry: {
        index: './app/js/index.js',
        /* bootstrapMin: './node_modules/bootstrap/dist/js/bootstrap.min.js', */
        /* new-page-name: './app/js/new-page-name.js', */
    },
    output: {
        filename: '[name].bundle.js',
    },
    module: {
        rules: [
            {
                test:/\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
};

module.exports = config;