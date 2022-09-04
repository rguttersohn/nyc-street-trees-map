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
    <p>
      Street trees counted in Community District {{ activeCD }} in 1995, 2005, and 2015
    </p>
    <div class="w-full mx-auto" id="chart-trees-all"></div>
    <p class="mt-10">Street trees by status (Show/hide categories by clicking on the legend.)</p>
    <div class="w-5/6 mx-auto" id="chart-trees-status"></div>
</template>