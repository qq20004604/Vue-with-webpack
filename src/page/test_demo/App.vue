<template>
    <div id="app">
        这是一个纯Vue项目，没有vue-router和vuex
        <button @click="test_login">ajax测试按钮</button>
        <button @click="test_post">post测试按钮</button>
    </div>
</template>
<script>
    export default {
        created () {
            window.app = this;
        },
        name: 'app',
        methods: {
            test_login () {
                this.$ajax.test_login().then(result => {
                    console.log(result)
                }).catch(err => {
                    console.log(`err:${err}`)
                })
            },
            test_post () {
                const data = {
                    a: 1
                }
                this.$ajax.test_post(data).then(result => {
                    console.log(result)
                }).catch(err => {
                    console.log(`err:${err}`)
                })
            }
        }
    }
</script>
<style lang="less" type="text/less">
    @import '~common/css/reset.css';
</style>

