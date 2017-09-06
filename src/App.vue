<template>
    <div id="app">
        <h1>HI!</h1>
        <router-link :to="{ name: 'home'}">home</router-link>
        <router-link :to="{ name: 'login'}">login</router-link>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'app',
    };
</script>

<style lang="scss">
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
