const webpackMearge=require('webpack-merge')
const webpakbaseconfig=require('./webpack.config.base')
const TerserPlugin =require('terser-webpack-plugin')
const webpackconfig=webpackMearge(webpakbaseconfig,{
    mode:"production",
    stats:{ children:false,warnings:false },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                  warnings: false,
                  parse: {},
                  compress: {
                    warnings: false,
                    drop_console:false,
                    dead_code:true,
                    drop_debugger:true
                  },
                  mangle: true, // Note `mangle.properties` is `false` by default.
                  output: {
                      comments:false,
                      beautify:false
                  },
                  parallel:true,
                  toplevel: false,
                  keep_classnames: undefined,
                  keep_fnames: false,
                },
              }),
        ],
        splitChunks: {
            cacheGroups: {
              commons: {
                name: 'commons',
                chunks: 'initial',
                minChunks:3,
                enforce:true
              }
            }
          }
      },
})
module.exports=webpackconfig