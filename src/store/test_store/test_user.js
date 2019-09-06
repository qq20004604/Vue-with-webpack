/*
* 用户登录信息
* */

let store = {
    state: {
        username: '' // 用户名
    },
    mutations: {
        updateUsername (state, payload) {
            state.username = payload
        }
    }
}
export default store
