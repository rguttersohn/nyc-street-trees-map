<script setup>
import { storeToRefs } from "pinia";
import { useCDStore } from "~~/store/cd";

let cdStore = useCDStore();

let { activeCD, cdTreeHistory } = storeToRefs(cdStore);
const chartGlobal = ref({
  lineChart:{},
  barChart:{}
});

onMounted(()=>{
    makeLineChart(chartGlobal.value, document.querySelector('#chart-trees-all'), cdTreeHistory.value['all'], ['#22C55E']);
    makeBarChart(chartGlobal.value, document.querySelector('#chart-trees-status'), cdTreeHistory.value['status'], ['#22C55E', '#EAB308','#EF4444']);
})


watch(cdTreeHistory,()=>{
    updateLineChart(chartGlobal.value, cdTreeHistory.value['all']);
    updateBarChart(chartGlobal.value, cdTreeHistory.value['status'])
})

</script>
<template>
  <div class="bg-blue-50 rounded-lg p-3 text-center">
    <h2 class="text-center font-bold my-5 text-blue-600">Community District {{ activeCD }}</h2>
    <h3 class="text-blue-600">
      Street trees counted in Community District {{ activeCD }} in 1995, 2005, and 2015
    </h3>
    <div id="chart-trees-all"></div>
    <h3 class="mt-10 text-blue-600">Street trees by status (Show/hide categories by clicking on the legend.)</h3>
    <div id="chart-trees-status"></div>
  </div>
</template>