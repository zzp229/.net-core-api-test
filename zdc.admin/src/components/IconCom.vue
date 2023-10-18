<template>
    <!-- <el-button :icon="icon" circle /> -->
    <component :is="icon" class="icon"></component>
</template>

<script setup lang="ts">
defineProps({
    icon: String
})
</script>

<style scoped>
/* 不加的话，图标会非常大 */
    .icon{
        height: 1em;
        width: 1em;
        vertical-align: middle;
        margin-right: 5px;
        text-align: center;
        font-size: 18px;
    }
</style>