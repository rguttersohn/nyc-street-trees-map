<script setup>
    import { storeToRefs } from 'pinia';
import { useSideBarStore } from '~~/store/sidebar';

    let sideBarStore = useSideBarStore();
    let {sideBarActive} = storeToRefs(sideBarStore);

</script>
<template>  
    
        <div 
            :class="{'h-0 overflow-hidden py-0 ' : !sideBarActive , 'h-fit py-3' : sideBarActive }"
            class="transition-all duration-300 px-3 rounded-b-lg p-3 text-center">
            <SidebarOptionsSelectCD/>
            <SidebarOptionsSelectFilter/>
        </div>
   
</template>