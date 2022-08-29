<script setup>
import { useSideBarStore } from '~~/store/sidebar';
import { useCDStore } from '~~/store/cd';
import { storeToRefs } from 'pinia';

const cdStore = useCDStore();
const sideBarStore = useSideBarStore();

let {activeCD} = storeToRefs(cdStore);
let {sideBarActive} = storeToRefs(useSideBarStore);
let {toggleSideBar} = sideBarStore;
</script>

<template>
    <div class="h-inherit flex flex-col justify-center">
      <div class="flex flex-col md:flex-row justify-start items-baseline gap-x-3">
            <button @click="toggleSideBar" class="mb-10 px-3 py-1 cursor-pointer border border-light-100 bg-white rounded-lg">
              <span v-if="sideBarActive">-</span>
              <span v-else>+</span>
            </button>
            <h2 class="text-center">Community District {{activeCD}}</h2>
       </div>
    </div>
</template>