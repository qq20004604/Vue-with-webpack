/**
 * Created by 王冬 on 2019/5/23.
 * QQ: 20004604
 * weChat: qq20004604
 * 功能说明：
 *
 */
import axios from 'axios'

// 是否启用使用form表单形式提交数据，默认不启用
const USE_FORM = false

// api请求基路径
let baseURL = ''
// 图片url基路径
let imgURL = ''

if (process.env.NODE_ENV === 'development') { // 开发环境
    baseURL = '/api'
} else { // 生产环境
    baseURL = ''
}

axios.defaults.baseURL = baseURL
// 使用form-data形式提交数据
if (USE_FORM) {
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
    axios.defaults.headers.post['Accept'] = 'application/x-www-form-urlencoded';
    axios.defaults.headers.get['Accept'] = 'application/x-www-form-urlencoded';

    axios.defaults.transformRequest = [function (data) {
        let ret = ''
        for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        ret = ret.slice(0, -1)
        return ret
    }]
}

// http request 拦截器
axios.interceptors.request.use(
    config => {
        return config
    },
    err => {
        return Promise.reject(err)
    }
)

// http response 拦截器
axios.interceptors.response.use(
    response => {
        return response
    },
    error => {
        return Promise.reject(error.response.data)
    }
)

let post = (url, data) => {
    return axios({
        method: 'post',
        url,
        data: USE_FORM ? data : JSON.stringify(data)
    })
}

let get = (url, params) => {
    return axios({
        method: 'get',
        url,
        params
    })
}

export {post, get}
