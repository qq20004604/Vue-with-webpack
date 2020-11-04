<template>
    <div id="app">
        <Container>
            这是一个纯Vue项目，没有vue-router和vuex
            <el-button type="primary" @click="test_login">ajax测试按钮</el-button>
            <el-button type="success" @click="test_post">post测试按钮</el-button>
        </Container>
    </div>
</template>
<script>
    import Container from 'components/container'

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
        },
        components: {
            Container
        }
    }
</script>
<style lang="less" type="text/less">
    @import '~common/css/reset.css';
</style>

