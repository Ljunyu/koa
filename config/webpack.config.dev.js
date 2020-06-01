const webpackMearge=require('webpack-merge')
const webpakbaseconfig=require('./webpack.config.base')
const webpackconfig=webpackMearge(webpakbaseconfig,{
    mode:"development",
    devtool:'eval-source-map',
    stats:{ children:false }
})
module.exports=webpackconfig