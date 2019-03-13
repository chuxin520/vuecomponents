const path = require('path')                            //path是Nodejs中的基本包,用来处理路径
//DE_ENV === "development"    //判断是否为测试环境,在启动脚本时设置的环境变量都是存在于process.env这个对象里面的

const HTMLPlugin = require('html-webpack-plugin')       //引入html-webpack-plugin
const webpack = require("webpack")                      //引入webpack
const {VueLoaderPlugin} = require('vue-loader')
const ExtractPlugin = require("extract-text-webpack-plugin")
// const isDev = process.env.NODE_ENV === "development"    //判断是否为测试环境,在启动脚本时设置的环境变量都是存在于process.env这个对象里面的
const isDev = process.env.NODE_ENV === "production"    //判断是否为测试环境,在启动脚本时设置的环境变量都是存在于process.env这个对象里面的

const config = {
  mode: process.env.NODE_ENV || 'production',
  target: "web",                                      //设置webpack的编译目标是web平台
  entry: path.join(__dirname, 'src/index.js'),
  //声明js文件入口,__dirname就是我们文件的根目录,用join拼接
  output: {                                            //声明出口文件
    filename: 'bundle.[hash:8].js',                          //将挂载的App全部打包成一个bundle.js,在浏览器中可以直接运行的代码
    path: path.join(__dirname, 'dist')               //bundle.js保存的位置
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'                  //处理jsx文件
      },
      // {
      //   test: /\.styl/, // {
      //
      //   use: [
      //     'stylus-loader',
      //     'style-loader',
      //     'css-loader'
      //   ]
      // },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'file-loader'
        ]
      },
      {
        test: /\.(gif|jpg|png|svg|PNG)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: '[name]-xu.[ext]'
            }
          }
        ]
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    runtimeChunk: true
  },
  plugins: [
    new webpack.DefinePlugin({                      //主要作用是在此处可以根据isdev配置process.env,一是可以在js代码中可以获取到process.env,
      'process.env': {                             //二是webpack或则vue等根据process.env如果是development,会给一些特殊的错误提醒等,而这些特殊项在正式环境是不需要的
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    }),
    new VueLoaderPlugin(),
    new HTMLPlugin()
  ]
}
if (isDev) {
  config.module.rules.push(
    {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader',
      ]
    }
  )
  config.devtool = '#cheap-module-eval-source-map'    //官方推荐使用这个配置,作用是在浏览器中调试时,显示的代码和我们的项目中的代码会基本相似,而不会显示编译后的代码,以致于我们调试连自己都看不懂

  config.devServer = {                                //这个devServer的配置是在webpack2.x以后引入的,1.x是没有的
    port: 8000,                                     //访问的端口号
    host: '127.0.0.1',                              //可以设置0.0.0.0 ,这样设置你可以通过127.0.0.1或则localhost去访问
    overlay: {
      errors: true,                               //编译中遇到的错误都会显示到网页中去
    },
    //open: true ,                                 //项目启动时,会默认帮你打开浏览器
    hot: true                                       //在单页面应用开发中,我们修改了代码后是整个页面都刷新,开启hot后,将只刷新对应的组件
  },
    config.plugins.push(                                //添加两个插件用于hot:true的配置
      new webpack.HotModuleReplacementPlugin(),
      // new webpack.NoEmitOnErrorsPlugin()
    )
}
else {
  config.output.filename = '[name].[chunkhash:8].js'  //此处一定是chunkhash,因为用hash时app和vendor的hash码是一样的了,这样每次业务代码更新,vendor也会更新,也就没有了意义.
  config.module.rules.push(
    {
      test: /\.css$/,
      use: ExtractPlugin.extract({
        // fallback: 'style-loader',
        use: [
          'css-loader'                      //css-loader处理css
        ]
      })
    },
  ),
    config.plugins.push(
      // new ExtractPlugin('styles.[chunkhash:8].css')   //定义打包分离出的css文件名

      new ExtractPlugin({
        filename: "dist/styles.[chunkhash:8].css"
      })
    )
  config.optimization = {

    splitChunks: {

      cacheGroups: {

        commons: {

          chunks: 'initial',

          minChunks: 2, maxInitialRequests: 5,

          minSize: 0

        },

        vendor: {

          test: /node_modules/,

          chunks: 'initial',

          name: 'vendor',

          priority: 10,

          enforce: true

        }

      }

    },

    runtimeChunk: true

  }

}

module.exports = config                                 //声明一个config的配置,用于对外暴露
