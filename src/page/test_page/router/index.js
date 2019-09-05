import Vue from 'vue'
import Router from 'vue-router'
import TestComponent from 'components/test'

Vue.use(Router)

const router = new Router({
    routes: [
        {
            name: 'HomePage',
            path: '/',
            component: TestComponent
        }
    ]
})

export default router
