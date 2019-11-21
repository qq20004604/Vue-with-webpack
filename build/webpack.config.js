// 引入插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
const fs = require('fs');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

function resolve (dir) {
    return path.join(__dirname, '..', dir);
}

//
const getEntries = function () {
    // 获取page目录
    let root = resolve(`src/page`);
    let list = [];
    // 读取该目录下所有文件和目录
    let allfiles = fs.readdirSync(root);
    // 遍历
    allfiles.forEach(filename => {
        let pname = path.join(`${root}/${filename}`);
        let info = fs.statSync(pname);
        // 查看该文件是不是目录
        if (info.isDirectory()) {
            // 是，则将该文件目录加入到dirs里
            list.push({
                filename,
                path: path.join(`${pname}/app.js`)
            });
        }
    });
    let entry = {};
    // 配置入口
    list.forEach(item => {
        entry[item.filename] = item.path;
    });
    // 配置 HtmlWebpackPlugin
    let plugins = list.map(item => {
        return new HtmlWebpackPlugin({
            filename: resolve(`dist/${item.filename}.html`),
            template: resolve(`index.html`),
            chunks: [item.filename /*'vendor'*/], // 实现多入口的核心，决定自己加载哪个js文件，
            xhtml: true    // 自闭标签
        });
    });
    let result = {
        entry,
        plugins
    };
    return result;
};
const entries = getEntries();

const config = {
    // 入口文件
    entry: entries.entry,
    // 出口文件
    output: {
        path: resolve('dist'),
        // 文件名，将打包好的导出为bundle.js
        filename: '[name].js'
    },
    // webpack-dev-server
    devServer: {
        contentBase: resolve('dist'),
        hot: true,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8000',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    module: {
        // loader放在rules这个数组里面
        rules: [
            {
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                include: [resolve('src'), resolve('app.js')],
                options: {
                    formatter: require('eslint-friendly-formatter')
                }
            },
            {
                test: /\.vue$/,
                exclude: /node_modules/,
                loader: 'vue-loader',
                options: {
                    css: ['css-loader'],
                    postcss: [require('autoprefixer')],
                    less: ['less-loader']
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        // 'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                modules: false,
                                minimize: true,
                                sourceMap: false
                            }
                        }
                    ]
                })
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        // 'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                root: resolve('src/static'),   // url里，以 / 开头的路径，去找src/static文件夹
                                minimize: true, // 压缩css代码
                                modules: false,
                                // sourceMap: true,    // sourceMap，默认关闭
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                config: {
                                    path: resolve('build')
                                },
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'less-loader'   // compiles Less to CSS
                        }
                    ]
                })

            },
            {
                test: /\.s(a|c)ss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        // 'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                root: resolve('src/static'),   // url里，以 / 开头的路径，去找src/static文件夹
                                minimize: true, // 压缩css代码
                                modules: false,
                                // sourceMap: true,    // sourceMap，默认关闭
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                config: {
                                    path: resolve('build')
                                },
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader'   // compiles Sass to CSS
                        }
                    ]
                })
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|ttf|woff)$/,
                use: [
                    {
                        loader: 'file-loader',
                        // 说明：https://github.com/qq20004604/webpack-study/tree/master/5%E3%80%81Loader/file_loader
                        options: {
                            // 这个是普通带[path]的，对context生效
                            // name: '[path][name]..[ext]',   // 文件名，这个是将图片放在打包后的img文件夹中

                            // 当name里使用了[path]的时候，这个才有意义，其他时候没必要加
                            // context: __dirname + '/../',

                            // 这个是对publicPath使用的
                            name: '[name].[hash:10].[ext]',   // 文件名，这个是将图片放在打包后的img文件夹中
                            publicPath: '../static/',

                            // 输出目录，表现效果相当于 outputPath + name 这样，可以直接写在name里如 myImage/[name].[ext] 效果一样
                            outputPath: function (fileName) {
                                return 'static/' + fileName;    // 后面要拼上这个 fileName 才行
                            }

                            // 文件路径使用 源代码中，图片相对于css文件路径
                            // useRelativePath: true

                            // 不生成打包后的图片
                            // emitFile: false
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-withimg-loader'
                    }
                ]
            }
        ]
    },
    // 将插件添加到webpack中
    // 如果还有其他插件，将两个数组合到一起就行了
    plugins: [
        ...entries.plugins,
        // HMR 需要的两个插件
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin('css/[name].css')
    ],
    resolve: {
        // 省略后缀名
        extensions: ['.js', '.vue'],
        alias: {
            '@': resolve('src'),
            'components': resolve('src/components'),
            'common': resolve('src/common'),
            'api': resolve('src/api'),
            'page': resolve('src/page'),
            'assets': resolve('src/assets'),
            'store': resolve('src/store'),
            'plugin': resolve('src/plugin'),
            'vue': 'vue/dist/vue.js',
            'img': resolve('src/img')
        }
    }
};

if (process.env.npm_lifecycle_event === 'build') {
    console.log('building..............');
    // config.output.publicPath = 'static';
    config.plugins = [...config.plugins,
        ...[
            new CleanWebpackPlugin(['dist'], {
                root: resolve(''),
                exclude: [],
                verbose: true,
                dry: false
            }),
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': '"production"'
                }
            }),
            // new webpack.optimize.CommonsChunkPlugin({
            //     name: 'vendor', // 这个对应的是 entry 的 key
            //     minChunks: 2
            // }),
            new UglifyJSPlugin(),
            new CopyWebpackPlugin([
                {
                    from: resolve('src/static'),
                    to: 'static',
                    ignore: ['.*']
                }
            ])
        ]
    ];
    config.resolve.alias = Object.assign({}, config.resolve.alias, {
        'vue': 'vue/dist/vue.min.js'
    })
    config.externals = {
        'vue': 'Vue',
        'vue-router': 'VueRouter',
        'vuex': 'Vuex'
    }
} else {
    config.plugins = [...config.plugins,
        ...[
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': '"development"'
                }
            })],
        ...entries.plugins
    ];
    console.log('\033[;31m 你可以通过以下链接来打开页面！');
    Object.keys(entries.entry).forEach(key => {
        if (key !== 'vendor') {
            console.log(`http://localhost:8080/${key}.html`);
        }
    });

    // config.resolve = Object.assign({}, config.resolve, {
    //     alias: {
    //         'vue': 'vue/dist/vue.min.js'
    //     }
    // })
}
module.exports = config;
