<script setup>
import { onMounted, ref, watch, computed } from "vue";
import { useTreeStore } from "../store/trees.js";
import { useCDStore } from "../store/cd.js";
import {useFiltersStore} from "../store/filters.js";
import { useSideBarStore } from "~~/store/sidebar";
import { storeToRefs } from "pinia";

    
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
    let {treeData, currentOffset} = storeToRefs(treeStore);
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
      addPlotPointEvents(mapGlobals.value, treeStore, sideBarStore);

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

</script>

<template>
  <div class="h-full w-full" id="map-holder"></div>
</template>
