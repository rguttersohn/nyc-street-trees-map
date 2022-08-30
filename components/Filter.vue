<script setup>
let filterPanelActive = ref(true);

const togglePanelActive = ()=>{
    filterPanelActive.value = !filterPanelActive.value
}
</script>
<template>
    <div 
    class="w-full md:w-1/4 md:ml-5 md:mt-5 absolute p-5 border-2 border-light-900 rounded-lg bg-white"
    >
        <FilterLegend/>
        <button class="flex justify-center items-center w-5/6 mx-auto gap-x-3" @click="togglePanelActive">
            <svg v-if="!filterPanelActive" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
            </svg>

            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5" />
            </svg>

        </button>
        <KeepAlive>
            <FilterSelectCD v-if="filterPanelActive" />
        </KeepAlive>
        <KeepAlive>
            <FilterSelectFilter v-if="filterPanelActive"  />
        </KeepAlive>
        
        
    </div>
</template>