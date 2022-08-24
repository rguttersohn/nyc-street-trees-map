<script setup>
import { storeToRefs } from 'pinia';
import { useTreeStore } from '~~/store/trees';

let treeStore = useTreeStore();

let {activeTreeData} = storeToRefs(treeStore);
const specie = computed(() => activeTreeData.value.spc_common ? activeTreeData.value.spc_common[0].toUpperCase() + activeTreeData.value.spc_common.slice(1) : 'Not recorded');

</script>

<template>
    <div class="my-3">
        <h3 class="font-bold text-blue-600">Species:</h3>
        <p>{{ specie }}</p>
    </div>
    <div class="my-3">
        <h3 class="font-bold text-blue-600">Address:</h3>
        <p>{{ activeTreeData.address }}</p>
    </div>
</template>