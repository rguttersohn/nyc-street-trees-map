<script setup>
import { storeToRefs } from 'pinia';
import { useTreeStore } from '~~/store/trees';

// images
import treeIcon from '~/assets/img/nature_FILL0_wght400_GRAD0_opsz48.svg';
import apartmentIcon from '~/assets/img/apartment_FILL0_wght400_GRAD0_opsz48.svg';



let treeStore = useTreeStore();

let {activeTreeData} = storeToRefs(treeStore);
const specie = computed(() => activeTreeData.value.spc_common ? activeTreeData.value.spc_common[0].toUpperCase() + activeTreeData.value.spc_common.slice(1) : 'Not recorded');

</script>

<template>
    <div class="my-3">
        <img :src="treeIcon" alt="icon of a tree" class="block mx-auto">
        <h3 class="font-bold">Species:</h3>
        <p>{{ specie }}</p>
    </div>
    <div class="my-3">
        <img :src="apartmentIcon" alt="icon of a tree" class="block mx-auto">
        <h3 class="font-bold">Address:</h3>
        <p>{{ activeTreeData.address }}</p>
    </div>
</template>