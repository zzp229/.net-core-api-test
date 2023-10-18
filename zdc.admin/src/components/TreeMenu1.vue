<template>
  <el-menu-item :index="item.Index" v-if="item.Children.length == 0">
    <el-icon>
      <Notebook />
    </el-icon>
    <!-- <span>{{ item.Name }}</span> -->
    <!-- 实现鼠标悬停提示 -->
    <template #title><span>{{ item.Name }}</span></template>
  </el-menu-item>

  <el-sub-menu :index="item.Index" v-else>
    <template #title>
      <el-icon>
        <Folder />
      </el-icon>
      <span>{{ item.Name }}</span>
    </template>
    <TreeMenu1 v-for="it in item.Children" :obj="it" :key="it.Index"></TreeMenu1>
  </el-sub-menu>

  <!-- <el-menu> -->
  <!-- 一级菜单 -->
  <!-- <el-menu-item :index="item.Index" v-for="item in list?.filter(p => p.Children.length == 0)">
      <el-icon><icon-menu /></el-icon>
      <span>{{ item.Name }}</span>
    </el-menu-item> -->

  <!-- 多级菜单 -->
  <!-- 多级菜单 -->
  <!-- <el-sub-menu :index="item.Index" v-for="item in list?.filter(p => p.Children.length > 0)">
      <template #title>
        <el-icon>
          <location />
        </el-icon>
        <span>{{ item.Name }}</span>
      </template> -->
  <!-- 递归组件 -->
  <!-- <TreeMenu1 :list="item.Children"></TreeMenu1>
    </el-sub-menu> -->

  <!-- <div v-for="item in list">
      <el-menu-item :index="item.Index" v-if="item.Children.length == 0">
        <el-icon><icon-menu /></el-icon>
        <span>{{ item.Name }}</span>
      </el-menu-item>

      <el-sub-menu :index="item.Index" v-else>
        <template #title>
          <el-icon>
            <location />
          </el-icon>
          <span>{{ item.Name }}</span>
        </template>
        <TreeMenu1 :list="item.Children"></TreeMenu1>
      </el-sub-menu>
    </div>

    <el-menu-item index="2">
      <el-icon><icon-menu /></el-icon>
      <template #title>Navigator Two</template>
    </el-menu-item>

  </el-menu> -->
</template>
  
  
  

<script setup lang="ts">
import { PropType } from "vue";
import TreeModel from "../class/TreeModel";

const props = defineProps({
  //?
  // list: Array<TreeModel>
  obj: Object as PropType<TreeModel>
})

//处理和修饰变量，因为item不能直接使用
const item: TreeModel = props.obj as TreeModel
</script>