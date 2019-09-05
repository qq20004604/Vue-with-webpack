# Vue.js2脚手架（适用于多页项目）

react脚手架，包含：

* axios（成熟的异步请求封装库，本项目已进行二次封装，方便使用）
* autoprefixer（增加css兼容性前缀）
* babel（实现浏览器兼容）
* eslint（要求代码符合格式才能正常运行，webstorm可以自动格式化）
* less（css预编译器）
* postcss
* webpack3（成熟的打包库）
* uglifyjs-webpack-plugin（代码压缩混淆）
* hotload（热重载，修改代码后不需要刷新）
* 开发模式下ajax转发（本地开发时解决跨域问题）
* 多页模式（按规则建立入口文件，不同入口自动打包为不同html文件）；
* 资源文件夹已分类（并在该文件夹下有相应说明文件）；
* 一个示例demo（见page/test_page）；
* reset.css（重置css样式，使得不同浏览器的样式保持一致）；
* 小图片自动打包到一个static文件夹内；

Vue全家桶里有vue2.6、vue-router、vuex。


## 1、说明

安装和fix一些npm包

> npm install
> 
> npm audit fix

开发模式

> npm run dev

打包模式：

> npm run build

webstorm应用eslint规则（格式化时自动将代码格式化为符合规则的格式）：

<img src='./doc/01.png'/>
