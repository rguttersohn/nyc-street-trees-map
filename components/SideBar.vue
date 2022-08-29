
<script setup>
import { useTreeStore } from '~~/store/trees';
import { useSideBarStore } from '~~/store/sidebar';
import { storeToRefs } from 'pinia';


    let treeStore = useTreeStore();
    let sideBarStore = useSideBarStore();
    let {activeTreeData} = storeToRefs(treeStore);
    let {sideBarActive, activeTab} = storeToRefs(sideBarStore);
    let {setSideBarFalse, setActiveTab, toggleSideBar} = sideBarStore;

    let SidebarCDTab = resolveComponent('LazySidebarCDTab');
    let SidebarTreeTab = resolveComponent('LazySidebarTreeTab');
</script>
<template>
  <div
    :class="{'w-full md:w-1/4 h-96 md:h-screen' : sideBarActive, 'w-full md:w-0 h-14 md:h-screen' : !sideBarActive}"
    class="absolute bottom-0 overflow-scroll md:top-0 md:right-0 transition-height md:transition-width duration-300 z-50 p-3 bg-white"
  >
    <button @click="toggleSideBar" class="sticky z-20 top-0 block mx-auto mb-10 px-3 py-1 cursor-pointer border border-light-100 bg-white rounded-lg">
      <span v-if="sideBarActive">Close Info Box</span>
      <span v-else>Open Info Box</span>
    </button>
    <div v-if="sideBarActive">
      <div class="flex justify-evenly">
      <h3 
        :class="{'hover:bg-blue-50 cursor-pointer' : activeTab !== 'cd', ' bg-blue-50' : activeTab === 'cd'}"
        class="w-full py-1 px-3 rounded-t-lg text-center"
        @click="setActiveTab('cd')"
        data-tab-name="cd"
        >Community District Information</h3>
      <h3
        :class="{'hover:bg-blue-50 border-2 border-blue-50 cursor-pointer' : activeTab !== 'tree', 'bg-blue-50' : activeTab === 'tree'}"
        class="w-full py-1 px-3 rounded-t-lg text-center"
        @click="setActiveTab('tree')"
        data-tab-name="tree"
        >Tree Information</h3>
    </div>
        <KeepAlive>
          <component :is="activeTab === 'cd' ? SidebarCDTab : SidebarTreeTab" ></component>
        </KeepAlive>
  </div>
  </div>
  
</template>