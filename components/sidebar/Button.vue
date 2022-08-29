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
    <div class="flex flex-col justify-center my-3">
      <div class="flex flex-col justify-evenly items-center gap-y-3 md:flex-row md:justify-start md:items-baseline md:gap-x-3 md:gap-y-0">
            <button @click="toggleSideBar" class="block px-3 py-1 cursor-pointer border border-light-100 bg-white rounded-lg">
              <span v-if="sideBarActive">-</span>
              <span v-else>+</span>
            </button>
            <h2 class="text-center">Community District {{activeCD}}</h2>
       </div>
    </div>
</template>