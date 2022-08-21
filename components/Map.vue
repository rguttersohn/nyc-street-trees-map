<script setup>
import { renderMap } from "../composables/MapRender";
import { onMounted, ref, watch, computed } from "vue";
import cdCoordinates from "../composables/cdCoordinates";
import { useTreeStore } from "../store/trees.js";
import { useCDStore } from "../store/cd.js";
import { storeToRefs } from "pinia";

    
    const mapGlobals = ref({
      map: "",
      lastTreeID:0,
      loaded: false,
    });
    const mapLoaded = computed(()=>mapGlobals.value.loaded);
    const treeStore = useTreeStore();
    const cdStore = useCDStore();
    let {treeData} = storeToRefs(treeStore);
    let {getTreeData} = treeStore;
    onMounted(() => renderMap(mapGlobals.value, cdCoordinates['109'] ));
    
    watch(mapLoaded, ()=>{
      getTreeData();
      renderCDMap(mapGlobals.value, cdStore);
      addCDEvents(mapGlobals.value, cdStore, treeStore)
    })

</script>

<template>
  <div
    class="h-screen w-full"
    id="map-holder"
  ></div>
</template>
