<script setup>
import { storeToRefs } from 'pinia';
import { useTreeStore } from '~~/store/trees';

let treeStore = useTreeStore();

let {activeTreeData} = storeToRefs(treeStore)
</script>

<template>
    <div class="my-3">
        <h3 class="mb-1 font-bold">Surrounding Area:</h3>
        <p>Sidewalk Damage: <span>{{ activeTreeData.sidewalk }}</span></p>
        <p>Guards: <span>{{ activeTreeData.guards }}</span></p>
        <p>Curb Location: <span>{{ activeTreeData.curb_loc }}</span></p>
        <p>Root Problem: <span>{{ activeTreeData.root_stone }}</span></p>
    </div>
</template>