<template>

    <div>
        a
        <ChildAA/>
        <ChildAB/>
    </div>
</template>

<script>
    import ChildAA from './child_aa'
    import ChildAB from './child_ab';

    export default {
        created () {
            console.log('a')
        },
        mounted () {
            console.log('_a')
        },
        name: "child_a",
        components: {
            ChildAA,
            ChildAB
        }
    }
</script>

<style scoped>

</style>
