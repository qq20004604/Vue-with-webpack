<!-- 容器 -->
<template>
    <div id="container">
        <slot></slot>
    </div>
</template>

<script>
    /*
    * 效果说明：
    * 1. 将代码放到本容器里，整体可以自动水平居中；
    * 2. 宽度由本组件控制，目前固定为 1200px 宽；
    * 3. 子元素可以包在一个容器里，width 设置为 100%，方便写 css；
    *
    * 使用示例：
    * 1. <tepmlate> 标签里引入
        <Container>
            <el-button type="primary" @click="test_login">嵌入的一个按钮</el-button>
        </Container>

       2. <script> 里引入
        import Container from 'components/container'
        然后在 components 对象里添加 Container，注册本组件
    * */
    export default {
        name: "container"
    }
</script>

<style scoped type="text/less">
    #container {
        position: relative;
        width: 1200px;
        margin: 0 auto;
    }
</style>
