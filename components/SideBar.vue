
<script setup>
import { useTreeStore } from "~~/store/trees";
import { useSideBarStore } from "~~/store/sidebar";
import { storeToRefs } from "pinia";

let treeStore = useTreeStore();
let sideBarStore = useSideBarStore();
let { activeTreeData } = storeToRefs(treeStore);
let { sideBarActive, activeTab } = storeToRefs(sideBarStore);
let { setSideBarFalse, setActiveTab, toggleSideBar } = sideBarStore;

let SidebarCDTab = resolveComponent("LazySidebarCDTab");
let SidebarTreeTab = resolveComponent("LazySidebarTreeTab");
</script>
<template>
  <div
    :class="{ 'h-20': !sideBarActive, 'h-5/6': sideBarActive }"
    class="absolute right-0 top-0 mr-5 mt-5 w-full md:w-1/4 transition-height duration-300 p-3 border-2 border-light-900 rounded-lg bg-white"
  >
    <SidebarButton />
    <div v-if="sideBarActive" class="h-full">
      <div class="flex justify-evenly">
        <h3
          :class="{
            'hover:bg-blue-50 cursor-pointer': activeTab !== 'cd',
            ' bg-blue-50': activeTab === 'cd',
          }"
          class="w-full py-1 px-3 rounded-t-lg text-center"
          @click="setActiveTab('cd')"
          data-tab-name="cd"
        >
          Community District Information
        </h3>
        <h3
          :class="{
            'hover:bg-blue-50 border-2 border-blue-50 cursor-pointer':
              activeTab !== 'tree',
            'bg-blue-50': activeTab === 'tree',
          }"
          class="w-full py-1 px-3 rounded-t-lg text-center"
          @click="setActiveTab('tree')"
          data-tab-name="tree"
        >
          Tree Information
        </h3>
      </div>
      <KeepAlive>
        <component
          :is="activeTab === 'cd' ? SidebarCDTab : SidebarTreeTab"
        ></component>
      </KeepAlive>
    </div>
  </div>
</template>