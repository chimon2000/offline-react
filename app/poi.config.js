const { InjectManifest } = require('workbox-webpack-plugin')

module.exports = {
    entry: 'src/index',
    plugins: [],
    devServer: {
        proxy: 'http://localhost:8081'
    },
    configureWebpack: config => {
        config.plugins.push(
            new InjectManifest({
                swSrc: './src/sw.js',
                swDest: 'sw.js'
            })
        )
    },
    output: {
        html: {
            title: 'Offline React'
        }
    }
}
