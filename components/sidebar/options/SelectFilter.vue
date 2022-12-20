<script setup>
import { useFiltersStore } from '~~/store/filters';
import { storeToRefs } from 'pinia';

        const filtersStore = useFiltersStore();
        const {setActiveFilter} = filtersStore;
        const {activeFilter, filters} = storeToRefs(filtersStore);
        const filterSelect = (event)=> {
            let {treeFilter} = event.target.dataset;
            setActiveFilter(treeFilter)
        };

</script>

<template>
    <section>
        <h3 id="select-tree-filter" class="mt-5">Select tree filter:</h3>
        <ul aria-labelledby="select-tree-filter" class="my-3 flex justify-evenly items-center bg-light">
            <li v-for="({filterName, id, thumbnail}, index) in filters" :key="index">
                <h4 :id="id">Tree {{ filterName }}</h4>
                <button
                    :aria-labelledby="id"
                    :data-tree-filter="filterName"
                    :aria-selected="filterName === activeFilter.filterName ? true : false"
                    @click="filterSelect"
                    class="h-24 w-24 bg-cover border hover:border-green-600 focus:border-green-600 rounded-lg aria-selected:border-green-600 aria-selected:border-2"
                    :class="{'pointer-events-none' : filterName === activeFilter.filterName}"
                    :style="{backgroundImage: `url(${thumbnail})`}">
                </button>
            </li>
        </ul>
    </section>
</template>