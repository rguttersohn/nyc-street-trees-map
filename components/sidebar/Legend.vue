<script setup>
import { useFiltersStore } from '~~/store/filters';
import { storeToRefs } from 'pinia';

    const filtersStore = useFiltersStore();
    const {activeFilter} = storeToRefs(filtersStore);
</script>

<template>
    <div class="w-full mx-auto my-5 flex flex-row justify-evenly items-center flex-wrap gap-x-3">
        <div class="flex gap-x-1 justify-evenly items-center">
            <span class="mr-1">Tree {{activeFilter.filterName}}:</span>
            <template
            v-for="(filterKey, index) in activeFilter.keys" 
            :key="index" 
            >
                <span>{{filterKey}}</span>
                <span
                :style="{backgroundColor: activeFilter.colors[index]}"
                class="flex-shrink-0 inline-block mx-1 w-[10px] h-[10px] rounded-full"></span>
            </template>
        </div>
    </div>
</template>