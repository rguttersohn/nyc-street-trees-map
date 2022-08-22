<script setup>
import { storeToRefs } from 'pinia';
import { useTreeStore } from '~~/store/trees';

let treeStore = useTreeStore();

let {activeTreeData} = storeToRefs(treeStore);
const specie = computed(() => activeTreeData.value.spc_common ? activeTreeData.value.spc_common[0].toUpperCase() + activeTreeData.value.spc_common.slice(1) : 'Not recorded');

</script>

<template>
    <h3 class="underline font-bold uppercase">Tree Info</h3>
    <p class="font-bold">Species:</p>
    <p>{{ specie }}</p>
    <p class="font-bold">Address:</p>
    <p>{{ activeTreeData.address }}</p>
</template>