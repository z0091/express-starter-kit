<template xmlns="">
    <el-container
            id="app">
        <el-header>
            <top-nav-menu/>
        </el-header>
        <el-main>
            <router-view></router-view>
        </el-main>
    </el-container>
</template>

<script>
    import TopNavMenu from '@/components/TopNavMenu';

    export default {
        name: 'app',
        components: {
            TopNavMenu,
        },
    };
</script>

<style lang="scss">
    /*#app {*/
        /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
        /*-webkit-font-smoothing: antialiased;*/
        /*-moz-osx-font-smoothing: grayscale;*/
        /*text-align: center;*/
        /*color: #2c3e50;*/
        /*margin-top: 60px;*/
    /*}*/
</style>
