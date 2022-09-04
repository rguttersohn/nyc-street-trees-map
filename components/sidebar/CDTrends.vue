<script setup>
import { storeToRefs } from 'pinia';
import { useSideBarStore } from '~~/store/sidebar';
let sideBarStore = useSideBarStore();

let {sideBarActive} = storeToRefs(sideBarStore);
</script>
<template>
    <div 
        :class="{'overflow-hidden h-0 py-0' : !sideBarActive, 'h-fit py-3' : sideBarActive}"
        class=" transiton-all px-3 rounded-b-lg text-center">
        <SidebarCdData/>
    </div>
</template>