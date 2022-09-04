<script setup>
import { useFiltersStore } from '~~/store/filters';
import { storeToRefs } from 'pinia';

    const filtersStore = useFiltersStore();
    const {activeFilter} = storeToRefs(filtersStore);
</script>

<template>
    <div class="w-10/12 mx-auto mt-2 mb-5 flex flex-row justify-evenly items-center flex-wrap gap-x-3">
        <h3 class=" basis-full text-center mb-3">Tree {{activeFilter.filterName}}:</h3>
        <div 
            v-for="(filterKey, index) in activeFilter.keys" 
            :key="index" 
            class="flex gap-x-1 justify-evenly items-center">
            <span>{{filterKey}}</span>
            <span
            :style="{backgroundColor: activeFilter.colors[index]}"
            class="inline-block mx-1 w-[15px] h-[15px] rounded-full"></span>
        </div>
    </div>
</template>