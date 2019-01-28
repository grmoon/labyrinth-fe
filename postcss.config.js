const mode = process.env.NODE_ENV == 'production' ? 'production' : 'development';

const plugins = [require('autoprefixer')];

if (mode == 'production') {
    plugins.push(require('cssnano'));
}

module.exports = {
    plugins
}