
<script setup>
import { useTreeStore } from '~~/store/trees';
import { useSideBarStore } from '~~/store/sidebar';
import { storeToRefs } from 'pinia';


    let treeStore = useTreeStore();
    let sideBarStore = useSideBarStore();
    let {activeTreeData} = storeToRefs(treeStore);
    let {sideBarActive, activeTab} = storeToRefs(sideBarStore);
    let {setSideBarFalse, setActiveTab, toggleSideBar} = sideBarStore;

    let LazySidebarCDTab = resolveComponent('LazySidebarCDTab');
    let LazySidebarTreeTab = resolveComponent('LazySidebarTreeTab');
</script>
<template>
  <div
    :class="{'w-full md:w-1/4 h-96 md:h-screen' : sideBarActive, 'w-full md:w-0 h-14 md:h-screen' : !sideBarActive}"
    class=" absolute bottom-0 overflow-scroll md:top-0 md:right-0 transition-height md:transition-width duration-300 z-50 p-3 bg-white"
  >
    <button @click="toggleSideBar" class="sticky top-0 block mx-auto mb-10 px-3 py-1 cursor-pointer border border-light-100 bg-white rounded-lg">
      <span v-if="sideBarActive">Close Info Box</span>
      <span v-else>Open Info Box</span>
    </button>
    <div v-if="sideBarActive">
      <div class="flex justify-evenly mb-10">
      <h3 
        :class="{'hover:underline cursor-pointer' : activeTab !== 'cd', 'underline' : activeTab === 'cd'}"
        @click="setActiveTab('cd')"
        data-tab-name="cd"
        >Community District</h3>
      <h3
        :class="{'hover:underline cursor-pointer' : activeTab !== 'tree', 'underline' : activeTab === 'tree'}"
        @click="setActiveTab('tree')"
        data-tab-name="tree"
        >Tree</h3>
    </div>
        <component :is="activeTab === 'cd' ? LazySidebarCDTab : LazySidebarTreeTab" ></component>
  </div>
  </div>
  
</template>