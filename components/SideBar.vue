
<script setup>
import { useTreeStore } from '~~/store/trees';
import { useSideBarStore } from '~~/store/sidebar';
import { storeToRefs } from 'pinia';


    let treeStore = useTreeStore();
    let sideBarStore = useSideBarStore();
    let {activeTreeData} = storeToRefs(treeStore);
    let {sideBarActive, activeTab} = storeToRefs(sideBarStore);
    let {setSideBarFalse, setActiveTab} = sideBarStore;

    let LazySidebarCDTab = resolveComponent('LazySidebarCDTab');
    let LazySidebarTreeTab = resolveComponent('LazySidebarTreeTab');
</script>
<template>
  <div
    :class="{'w-3/4 md:w-1/4' : sideBarActive, 'w-0' : !sideBarActive}"
    class=" absolute right-0 transition-width duration-300 z-50 p-3 bg-white h-screen"
  >
    <div v-if="sideBarActive">
      <button @click="setSideBarFalse" class="block mx-auto mb-10 px-3 py-1 cursor-pointer border border-light-100 rounded-lg">Close Sidebar</button>
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