<script setup>
import { storeToRefs } from "pinia";
import { useCDStore } from "~~/store/cd";

let cdStore = useCDStore();

let { activeCD, cdTreeHistory } = storeToRefs(cdStore);
const chartGlobal = ref({
  chart:{}
});


watch(cdTreeHistory,(oldval, newval)=>{
  
  makeLineChart(chartGlobal.value, document.querySelector('#chart-trees-all'), cdTreeHistory.value, '#ea0029');
  // updateLineChart(chartGlobal.value, cdTreeHistory.value);
})

</script>
<template>
  <div>
    <h2 class="text-center font-bold my-5">Community District {{ activeCD }}</h2>
    <h3 class="font-bold">
      Trees counted in Community District {{ activeCD }} in 1995, 2005, and 2015
    </h3>
    <div id="chart-trees-all"></div>
  </div>
</template>