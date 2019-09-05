/**
* Created by 王冬 on 2019-09-05.
* QQ: 20004604
* weChat: qq20004604
* 功能说明：
*
*/

<template>
    <div>
        <div>this is template body</div>
        <div>number: {{number}}</div>
        <button @click="number++" class="test">number ➕➕</button>
    </div>
</template>
<style scoped lang="less" type="text/less">
    .test {
        position: relative;
        left: 0;
        animation: move 5s linear;
    }

    @keyframes move {
        0% {
            left: 0;
        }
        50% {
            left: 50px;
        }
        100% {
            left: 0;
        }
    }

</style>
<script>
    // import HeaderComponent from './components/header.vue'
    export default {
        name: 'test',
        data () {
            return {
                number: 0
            }
        },
        methods: {},
        components: {
            // HeaderComponent,
        }
    }
</script>
