
<script setup>
import { useTreeStore } from '~~/store/trees';
import { useSideBarStore } from '~~/store/sidebar';
import { storeToRefs } from 'pinia';


    let treeStore = useTreeStore();
    let sideBarStore = useSideBarStore();
    let {activeTreeData} = storeToRefs(treeStore);
    let {sideBarActive} = storeToRefs(sideBarStore);
    let {setSideBarFalse} = sideBarStore;
    
    // const activeTab = computed(()=>store.state.activeTab)
    // const setActiveTab = (event) => {
    //       store.commit('setActiveTab', event.target.dataset.tabName)
    // }


</script>
<template>
  <div
    :class="{'w-3/4 md:w-1/4' : sideBarActive, 'w-0' : !sideBarActive}"
    class=" absolute right-0 transition-width duration-300 z-50 p-3 bg-white h-screen"
  >
    <div v-if="sideBarActive">
      <button @click="setSideBarFalse" class="block mx-auto mb-10 px-3 py-1 cursor-pointer border border-light-100 rounded-lg">Close Sidebar</button>
      <SidebarTreeTab/>
  </div>
  </div>
  
</template>