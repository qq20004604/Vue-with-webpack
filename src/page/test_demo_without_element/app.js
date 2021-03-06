/**
 * Created by 王冬 on 2019-09-05.
 * QQ: 20004604
 * weChat: qq20004604
 * 功能说明：
 * 1、作为示例提供参考
 */

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import 'common/less/config.less'
import http from '@/api/ajax.js';
import forDevelopment from 'plugin/for_development'

// 浏览器的title（就是显示在tag标签的本页面名字）
const TITLE = '测试demo，纯vue'

document.getElementsByTagName('title')[0].innerText = TITLE

Vue.config.productionTip = false
Vue.use(http)
// Vue.use(ElementUI)

// 开发调试配置
if (process.env.NODE_ENV === 'development') {
    Vue.use(forDevelopment)
} else {
    // 非开发状态屏蔽console.log显示
    console.log = function () {
    }
    console.error = function () {
    }
}

/* eslint-disable no-new */
new Vue({
    el: '#app',
    template: '<App/>',
    components: {App}
})
