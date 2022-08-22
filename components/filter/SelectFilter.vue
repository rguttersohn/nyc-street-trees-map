<script setup>
import { useFiltersStore } from '~~/store/filters';
        const filtersStore = useFiltersStore();
        const {setActiveFilter} = filtersStore;
        const radioClick = (event)=> {setActiveFilter(event.target.value);};
</script>

<template>
<h3 class="mt-5">Change filter:</h3>
    <div class="my-3 flex justify-evenly items-center bg-light">
        <input @click="radioClick" name="tree-filter" type="radio" value="status" checked="checked">
        <label for="status">Tree Status</label>
        <input @click="radioClick" name="tree-filter" type="radio" value="health">
        <label for="tree-health">Tree Health</label>
    </div>
</template>