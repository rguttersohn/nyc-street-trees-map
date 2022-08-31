
<script setup>
import { useTreeStore } from "~~/store/trees";
import { useSideBarStore } from "~~/store/sidebar";
import { useCDStore } from "~~/store/cd";
import { storeToRefs } from "pinia";

// tab images
import cdTrendsImage from '~/assets/img/cdtrends.svg';
import treeInfoImage from '~/assets/img/treeinfo.svg';
import optionsImage from '~/assets/img/options.svg';

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
        <SidebarTab tabName="cd" :imageSrc="cdTrendsImage">Community Disrict Trends</SideBarTab>
        <SidebarTab tabName="tree" :imageSrc="treeInfoImage">Tree Info</SideBarTab>
        <SidebarTab tabName="options" :imageSrc="optionsImage">Options</SideBarTab>
      </div>
      <KeepAlive>
        <component
          :is="activeTab === 'cd' ? SidebarCDTab : SidebarTreeTab"
        ></component>
      </KeepAlive>
    </div>
  </div>
</template>