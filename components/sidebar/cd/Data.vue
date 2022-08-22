<script setup>
import { storeToRefs } from 'pinia';
import { useCDStore } from '~~/store/cd';

let cdStore = useCDStore();

let {activeCD} = storeToRefs(cdStore);

</script>
<template> 
   <div>
        <h3 class="font-bold">Trees counted in Community District {{activeCD}} in 1995, 2005, and 2015</h3>
        <div id="chart_trees-all"></div>
   </div>
</template>