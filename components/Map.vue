<script setup>
import { useTreeStore } from "../store/trees.js";
import { useCDStore } from "../store/cd.js";
import {useFiltersStore} from "../store/filters.js";
import { useSideBarStore } from "~~/store/sidebar";
import { storeToRefs } from "pinia";

// images
import treeIcon from '~/assets/img/tree.svg';


    
    const mapGlobals = ref({
      map: "",
      lastTreeID:0,
      loaded: false,
    });
    const mapLoaded = computed(()=>mapGlobals.value.loaded);
    const treeStore = useTreeStore();
    const cdStore = useCDStore();
    const filtersStore = useFiltersStore();
    const sideBarStore = useSideBarStore();
    let {setSideBarTrue, setSideBarFalse, setActiveTab} = sideBarStore;
    let {sideBarActive} = storeToRefs(sideBarStore);
    let {treeData, currentOffset, activeTreeData} = storeToRefs(treeStore);
    let {getTreeData} = treeStore;
    let {setActiveFilter} = filtersStore;
    let {activeFilter} = storeToRefs(filtersStore);
    let {getActiveCDCoords, getCDTreeHistory} = cdStore;
    let {activeCD} = storeToRefs(cdStore);

    onMounted(() => renderMap(mapGlobals.value, getActiveCDCoords));
    
    watch(mapLoaded, ()=>{
      getTreeData();
      renderCDMap(mapGlobals.value, cdStore);
      addCDEvents(mapGlobals.value, cdStore, treeStore, sideBarStore);
      setActiveFilter('status');
      initPlotPoints(mapGlobals.value, filtersStore);
      addPlotPointEvents(mapGlobals.value, treeStore, sideBarStore, htmlPopup.value);
      getCDTreeHistory(activeCD);

    })

    watch(treeData, () => {
      addData(treeData.value, mapGlobals.value, treeStore);
    }, {deep: true});

    watch(currentOffset, ()=>{
      getTreeData();
    });

    watch(activeCD, () => {
      refilterCDMap(mapGlobals.value, cdStore);
      recenterMap( mapGlobals.value, cdStore);
      getCDTreeHistory(activeCD);
    })

    watch(activeFilter, ()=>{
      resetPaint(mapGlobals.value, filtersStore)
    })
  
    // ref for map popup
    const htmlPopup = ref(null);

    const handlePopupClick_sidebarActive = ()=> {
      setSideBarTrue();
      setActiveTab('tree');
    }

    const handlePopupClick_sidebarInactive = ()=>{
      setSideBarFalse();
    }

    const specie = computed(() => activeTreeData.value.spc_common ? activeTreeData.value.spc_common[0].toUpperCase() + activeTreeData.value.spc_common.slice(1) : 'Not recorded');
    const health =computed(() => activeTreeData.value.status ==='Alive' ? activeTreeData.value.health : 'N/A')

</script>

<template>
  <section class="h-screen w-screen" id="map-holder">
  </section>
  <div id="popup-content" ref="htmlPopup"  class="hidden py-5 px-3">
    <img class="block mx-auto" :src="treeIcon" alt="">
    <div class="my-5" v-if="sideBarActive">
      <button @click="handlePopupClick_sidebarInactive"
        class="block mx-auto mt-5 border-green-500 hover:bg-green-500 border-2 rounded-lg px-3 hover:cursor-pointer text-green-500 hover:text-white"
        >Close Sidebar</button>
    </div>
    <div v-else class="my-5">
      <h4 class="mt-3 font-semibold text-green-600">Species:</h4>
      <h4>{{specie}}</h4>
      <h4 class="mt-3 font-semibold text-green-600">Status:</h4> 
      <h4>{{activeTreeData.status}}</h4>
      <h4 class="mt-3 font-semibold text-green-600">Health:</h4> 
      <h4>{{health}}</h4>
      <button @click="handlePopupClick_sidebarActive"
        class="block mx-auto mt-5 border-green-500 hover:bg-green-500 border-2 rounded-lg px-3 hover:cursor-pointer text-green-500 hover:text-white"
        >Learn More</button>
    </div>
  </div>
</template>
