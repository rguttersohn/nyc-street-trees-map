<script setup>
import { storeToRefs } from 'pinia';
import { useTreeStore } from '~~/store/trees';

let treeStore = useTreeStore();

let {activeTreeData} = storeToRefs(treeStore)
</script>

<template>
    <div class="my-3 col-span-2 sm:col-span-1 lg:col-span-2">
        <h3 class="mb-1 font-bold">Surrounding Area:</h3>
        <p>Sidewalk Damage: {{ activeTreeData.sidewalk }}</p>
        <p>Guards: {{ activeTreeData.guards }}</p>
        <p>Curb Location: {{ activeTreeData.curb_loc }}</p>
        <p>Root Problem: {{ activeTreeData.root_stone }}</p>
    </div>
</template>