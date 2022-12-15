<script setup>
import { storeToRefs } from 'pinia';
import { useTreeStore } from '~~/store/trees';

// images
import rulerIcon from '~/assets/img/straighten_FILL0_wght400_GRAD0_opsz48.svg';
import monitorIcon from '~/assets/img/monitor_heart_FILL0_wght400_GRAD0_opsz48.svg';
import listIcon from '~/assets/img/format_list_bulleted_FILL0_wght400_GRAD0_opsz48.svg';
import problemIcon from '~/assets/img/error_FILL0_wght400_GRAD0_opsz48.svg';

let treeStore = useTreeStore();

let {activeTreeData} = storeToRefs(treeStore);
const problems = computed(()=> activeTreeData.value.problems ? activeTreeData.value.problems.split(',') : ['Not Recorded'])

</script>

 <template>
        <div class="my-3">
            <img class="block mx-auto" :src="listIcon" alt="icon showing a checklist">
            <h3 class="font-bold">Status:</h3>
            <p>{{activeTreeData.status}}</p>
        </div>
        <div class="my-3" v-show="activeTreeData.status === 'Alive'">
            <img  class="block mx-auto" :src="monitorIcon" alt="icon showing a heart monitor">
            <h3  class="font-bold" >Health:</h3>
            <p>{{activeTreeData.health}}</p>
        </div>
        <div class="my-3" v-show="activeTreeData.status === 'Alive' || activeTreeData.status === 'Dead' ">
            <img class="block mx-auto" :src="rulerIcon" alt="circle icon">
            <h3 class="font-bold">Trunk Diameter:</h3> 
            <p>{{activeTreeData.tree_dbh}} inches</p>
        </div>
        <div class="my-3" v-show="activeTreeData.status === 'Stump'">
            <img class="block mx-auto" :src="rulerIcon" alt="circle icon">
            <h3 class="font-bold">Stump Diameter:</h3> 
            <p>{{activeTreeData.stump_diam}} inches</p>
        </div>
        <div class="my-3">
            <img class="block mx-auto" :src="problemIcon" alt="">
            <h3 class="font-bold">Problems:</h3>
            <ul class="ml-5 list-disc">
                <li v-for="(problem, index) in problems" :key="index">{{problem}}</li>
            </ul>
        </div>
 </template>