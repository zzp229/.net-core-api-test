<template>
    <!-- 需要内嵌的页面放到这里面 -->
    <el-container>
        <el-aside style="width:inherit;">
            <el-menu :collapse="isCollapse" router :unique-opened="true"
                style="height: 100vh; background-color:blanchedalmond;" @select="handleSelect"
                :default-active="router.currentRoute.value.path">

                <!-- el-menu有router所以就可以实现跳转？ -->
                <el-sub-menu index="/desktop">
                    <template #title>
                        <IconCom icon="house"></IconCom>
                        <span>我的主页</span>
                    </template>
                    <el-menu-item index="/desktop">
                        <IconCom icon="wallet"></IconCom>
                        <span>工作台</span>
                    </el-menu-item>
                    <el-menu-item index="/person">
                        <IconCom icon="monitor"></IconCom>
                        <span>个人信息</span>
                    </el-menu-item>
                </el-sub-menu>
                <!--加上router就可以根据key跳转-->
                <!-- 嵌套TreeMenu组件 -->
                <TreeMenu :obj="item" :key="item.Index" v-for="item in list"></TreeMenu>
            </el-menu>
        </el-aside>
        <el-container>
            <el-header>
                <HeaderCom></HeaderCom>
                <!-- <IconCom icon="expand"></IconCom> -->
            </el-header>
            <!-- 其它组件会被加载到这里，嵌套路由 -->
            <el-main><router-view></router-view></el-main>
        </el-container>
    </el-container>
</template>

<script lang="ts" setup>
import TreeMenu from '../../components/TreeMenu1.vue'
import TreeModel from '../../class/TreeModel'
import { ref, computed } from 'vue';
import IconCom from '../../components/IconCom.vue';
import HeaderCom from '../../components/HeaderCom.vue';
import useStore from '../../store/index';
import { handleSelect } from '../../tool/index'
import router from '../../router';
// console.log(`折叠菜单全局状态的值：${useStore().isCollapse}`);

const list: Array<TreeModel> = [
    {
        "Name": "菜单管理",
        "Index": "/menu",
        "FilePath": "",
        "Children": [
            {
                "Name": "菜单列表",
                "Index": "/menu",
                "Children": [],
                "FilePath": "menu.vue"
            }
        ]
    },
    {
        "Name": "角色管理",
        "Index": "/role",
        "FilePath": "",
        "Children": [
            {
                "Name": "角色列表",
                "Index": "/role",
                "Children": [],
                "FilePath": "role.vue"
            }
        ]
    },
    {
        "Name": "用户管理",
        "Index": "/user",
        "FilePath": "",
        "Children": [
            {
                "Name": "用户列表",
                "Index": "/user",
                "Children": [],
                "FilePath": "user.vue"
            }
        ]
    }
]

const isCollapse = computed(() => useStore().isCollapse)
</script>
