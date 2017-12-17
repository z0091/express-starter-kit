<template>
    <el-menu
            :default-active="$route.path"
            class=""
            :router="true"
            mode="horizontal">
        <template
                v-for="route in $router.options.routes"
                v-if="!route.hidden">
            <el-menu-item
                    v-if="!route.hasChild"
                    :key="route.path"
                    :index="route.path">
                <i :class="route.class"></i>
                {{ route.name }}
            </el-menu-item>

            <el-submenu v-else :index="route.path">
                <template slot="title">{{ route.name }}</template>
                <el-menu-item
                        v-for="child in route.children"
                        :index="child.path"
                        :key="child.path">
                    {{ child.name }}
                </el-menu-item>
            </el-submenu>
        </template>
    </el-menu>
</template>

<script>
    export default {
        name: "top-nav-menu"
    }
</script>

<style scoped>

</style>
