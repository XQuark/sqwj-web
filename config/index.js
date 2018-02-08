// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

let caoHost = "http://192.168.31.172"
let wangHost = "http://192.168.31.166"
let maoHost = 'http://192.168.31.202'
const realHost = "http://121.42.184.125"
// const realHost = "http://192.168.31.172"

// caoHost = realHost
// wangHost = realHost
const setHeader = (proxyReq, req, res) => {
    proxyReq.setHeader('host', 'sqwj.51shop.mobi');
    proxyReq.setHeader('Origin', 'http://sqwj.51shop.mobi');
    proxyReq.setHeader('User-Agent', 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1');
}
const table = {}
;[
    "/p/",
    // "/v2/getCart",
    // "/v2/user",
    "/sellerpc",
    "/cart",
    "/v2",
    "/user",
    "/zone",
    "/order",
    "/cashier",
    "/productCollection"
].forEach((key) => {
    table[key] = {
        target: realHost,
        changeOrigin: true,
        onProxyReq: setHeader
    }
})


module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 80,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: table,
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
