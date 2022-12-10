
<script setup>
import { useTreeStore } from "~~/store/trees";
import { useSideBarStore } from "~~/store/sidebar";
import { useCDStore } from "~~/store/cd";
import { storeToRefs } from "pinia";

// tab images
import cdTrendsImage from '~/assets/img/cdtrends.svg';
import treeInfoImage from '~/assets/img/treeinfo.svg';
import optionsImage from '~/assets/img/options.svg';


// store data
let treeStore = useTreeStore();
let sideBarStore = useSideBarStore();
let cdStore = useCDStore();

let {activeCD} = storeToRefs(cdStore);
let { activeTreeData } = storeToRefs(treeStore);
let { sideBarActive, tabs, activeTab } = storeToRefs(sideBarStore);
let { setSideBarFalse, toggleSideBar } = sideBarStore;

const tabComponents = {
  cd: resolveComponent("LazySidebarCDTrends"),
  tree: resolveComponent("LazySidebarTreeInfo"),
  options: resolveComponent("LazySidebarOptions"),
}
</script>

<template>
  <section
    :class="{ 'overflow-hidden h-48 md:h-48 drop-shadow-sm': !sideBarActive, 'overflow-scroll h-[66vh] md:h-[75vh] drop-shadow-2xl': sideBarActive }"
    class="absolute top-0 md:right-0 md:top-0 md:mr-5 md:mt-5 w-full md:w-1/4 transition-height duration-300 border-2 border-light-900 rounded-none md:rounded-lg bg-white"
  >
    <div class="h-full">
      <header class="sticky top-0 bg-white z-10">
        <SidebarSelectCD/>
        <SidebarLegend/>
        <nav class="flex justify-evenly gap-x-1">
          <SidebarTab tabName="cd" :imageSrc="cdTrendsImage">Trends</SideBarTab>
          <SidebarTab tabName="tree" :imageSrc="treeInfoImage">Tree Info</SideBarTab>
          <SidebarTab tabName="options" :imageSrc="optionsImage">Options</SideBarTab>
        </nav>
      </header>
      <Transition>
        <KeepAlive>
            <component :is="tabComponents[activeTab]"></component>
        </KeepAlive>
      </Transition>
    </div>
  </section>
</template>