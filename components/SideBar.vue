
<script setup>
import { useTreeStore } from "~~/store/trees";
import { useSideBarStore } from "~~/store/sidebar";
import { useCDStore } from "~~/store/cd";
import { storeToRefs } from "pinia";

let treeStore = useTreeStore();
let sideBarStore = useSideBarStore();
let cdStore = useCDStore();

let {activeCD} = storeToRefs(cdStore);
let { activeTreeData } = storeToRefs(treeStore);
let { sideBarActive, activeTab } = storeToRefs(sideBarStore);
let { setSideBarFalse, toggleSideBar } = sideBarStore;

let SidebarCDTab = resolveComponent("LazySidebarCDTab");
let SidebarTreeTab = resolveComponent("LazySidebarTreeTab");
</script>
<template>
  <div
    :class="{ 'h-28 md:h-40': !sideBarActive, 'h-4/6 md:h-5/6': sideBarActive }"
    class="absolute bottom-0 md:right-0 md:top-0 md:mr-5 md:mt-5 w-full md:w-1/4 transition-height duration-300 p-3 border-2 border-light-900 rounded-lg bg-white"
  >
    <h2 class="text-center">Community District {{activeCD}}</h2>
    <SidebarLegend/>
    <SidebarButton />
    <div v-if="sideBarActive" class="h-full">
      <div class="flex justify-evenly">
        <SidebarTab tabName="cd">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="block mx-auto w-5 h-5">
            <path d="M15.5 2A1.5 1.5 0 0014 3.5v13a1.5 1.5 0 001.5 1.5h1a1.5 1.5 0 001.5-1.5v-13A1.5 1.5 0 0016.5 2h-1zM9.5 6A1.5 1.5 0 008 7.5v9A1.5 1.5 0 009.5 18h1a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0010.5 6h-1zM3.5 10A1.5 1.5 0 002 11.5v5A1.5 1.5 0 003.5 18h1A1.5 1.5 0 006 16.5v-5A1.5 1.5 0 004.5 10h-1z" />
          </svg>
          <h3>Community Disrict Trends</h3>
        </SideBarTab>
        <SidebarTab tabName="tree">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="block mx-auto w-5 h-5">
            <path fill-rule="evenodd" d="M19 10.5a8.5 8.5 0 11-17 0 8.5 8.5 0 0117 0zM8.25 9.75A.75.75 0 019 9h.253a1.75 1.75 0 011.709 2.13l-.46 2.066a.25.25 0 00.245.304H11a.75.75 0 010 1.5h-.253a1.75 1.75 0 01-1.709-2.13l.46-2.066a.25.25 0 00-.245-.304H9a.75.75 0 01-.75-.75zM10 7a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
          </svg>
          <h3>Tree Info</h3>
        </SideBarTab>
        <SidebarTab tabName="options">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="block mx-auto w-5 h-5">
            <path d="M10 3.75a2 2 0 10-4 0 2 2 0 004 0zM17.25 4.5a.75.75 0 000-1.5h-5.5a.75.75 0 000 1.5h5.5zM5 3.75a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5a.75.75 0 01.75.75zM4.25 17a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5h1.5zM17.25 17a.75.75 0 000-1.5h-5.5a.75.75 0 000 1.5h5.5zM9 10a.75.75 0 01-.75.75h-5.5a.75.75 0 010-1.5h5.5A.75.75 0 019 10zM17.25 10.75a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5h1.5zM14 10a2 2 0 10-4 0 2 2 0 004 0zM10 16.25a2 2 0 10-4 0 2 2 0 004 0z" />
          </svg>
          <h3>Options</h3>
        </SideBarTab>
      </div>
      <KeepAlive>
        <component
          :is="activeTab === 'cd' ? SidebarCDTab : SidebarTreeTab"
        ></component>
      </KeepAlive>
    </div>
  </div>
</template>