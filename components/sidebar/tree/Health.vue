<script setup>
import { storeToRefs } from 'pinia';
import { useTreeStore } from '~~/store/trees';

let treeStore = useTreeStore();

let {activeTreeData} = storeToRefs(treeStore);
const problems = computed(()=> activeTreeData.value.problems ? activeTreeData.value.problems.split(',') : ['Not Recorded'])

</script>

 <template>
        <div class="my-3">
            <h3 class="font-bold">Status:</h3>
            <p>{{activeTreeData.status}}</p>
        </div>
        <div class="my-3" v-show="activeTreeData.status === 'Alive'">
            <h3  class="font-bold" >Health:</h3>
            <p>{{activeTreeData.health}}</p>
        </div>
        <div class="my-3" v-show="activeTreeData.status === 'Alive' || activeTreeData.status === 'Dead' ">
            <h3 class="font-bold">Trunk Diameter:</h3> 
            <p>{{activeTreeData.tree_dbh}} inches</p>
        </div>
        <div class="my-3" v-show="activeTreeData.status === 'Stump'">
            <h3 class="font-bold">Stump Diameter:</h3> 
            <p>{{activeTreeData.stump_diam}} inches</p>
        </div>
        <div class="my-3">
            <h3 class="font-bold">Problems:</h3>
            <ul class="ml-5 list-disc">
                <li v-for="(problem, index) in problems" :key="index">{{problem}}</li>
            </ul>
        </div>
 </template>