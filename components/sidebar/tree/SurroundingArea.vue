<script setup>
import { storeToRefs } from 'pinia';
import { useTreeStore } from '~~/store/trees';

let treeStore = useTreeStore();

let {activeTreeData} = storeToRefs(treeStore)
</script>

<template>
    <div>
        <h3 class="font-bold">Surrounding Area:</h3>
        <p>Sidewalk Damage: <span>{{ activeTreeData.sidewalk }}</span></p>
        <p>Guards: <span>{{ activeTreeData.guards }}</span></p>
        <p>Curb Location: <span>{{ activeTreeData.curb_loc }}</span></p>
        <p>Root Problem: <span>{{ activeTreeData.root_stone }}</span></p>
    </div>
</template>