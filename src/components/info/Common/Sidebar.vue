<template>
    <div class="sidebar">
        <el-row>
            <el-menu router default-active="2" class="el-menu-vertical-demo" theme="dark" @open="handleOpen" @close="handleClose">
                <el-submenu index="1">
                    <template slot="title"><i class="el-icon-menu"></i>用户管理</template>
                    <el-menu-item-group>
                        <template slot="title"></template>
                        <el-menu-item index="/info/user">用户信息</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title"><i class="el-icon-document"></i>订单管理</template>
                    <el-menu-item-group>
                        <template slot="title"></template>
                        <el-menu-item index="/info/orderform">订单信息</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title"><i class="el-icon-share"></i>商家管理</template>
                    <el-menu-item-group>
                        <template slot="title"></template>
                        <el-menu-item index="/info/shops">商家信息</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
        </el-row>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                openArr: ["1", "2"]
            }
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        },
        computed: {
            onRoutes() {
                return this.$route.path.replace('/', '');
            }
        }
    }
</script>
<style scoped>
    .sidebar {
        display: block;
        position: absolute;
        width: 250px;
        left: 0;
        top: 70px;
        bottom: 0;
        background: #2E363F;
    }
    .sidebar>ul {
        height: 100%;
    }
</style>
