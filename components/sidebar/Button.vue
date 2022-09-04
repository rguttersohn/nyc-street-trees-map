<script setup>
import { useSideBarStore } from '~~/store/sidebar';
import { useCDStore } from '~~/store/cd';
import { storeToRefs } from 'pinia';

const cdStore = useCDStore();
const sideBarStore = useSideBarStore();

let {activeCD} = storeToRefs(cdStore);
let {sideBarActive} = storeToRefs(sideBarStore);
let {toggleSideBar} = sideBarStore;
</script>

<template>
      <div class="flex flex-col justify-center items-center gap-y-3">
            <button @click="toggleSideBar" class="block px-3 py-1 cursor-pointer border border-light-100 bg-white rounded-lg">
              <svg v-show="!sideBarActive" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="block mx-auto w-5 h-5">
                <path fill-rule="evenodd" d="M14.77 4.21a.75.75 0 01.02 1.06l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 011.08-1.04L10 8.168l3.71-3.938a.75.75 0 011.06-.02zm0 6a.75.75 0 01.02 1.06l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 111.08-1.04L10 14.168l3.71-3.938a.75.75 0 011.06-.02z" clip-rule="evenodd" />
              </svg>
              <svg v-show="sideBarActive" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="block mx-auto w-5 h-5">
                <path fill-rule="evenodd" d="M5.23 15.79a.75.75 0 01-.02-1.06l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 11-1.08 1.04L10 11.832 6.29 15.77a.75.75 0 01-1.06.02zm0-6a.75.75 0 01-.02-1.06l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 11-1.08 1.04L10 5.832 6.29 9.77a.75.75 0 01-1.06.02z" clip-rule="evenodd" />
              </svg>
            </button>
       </div>
</template>