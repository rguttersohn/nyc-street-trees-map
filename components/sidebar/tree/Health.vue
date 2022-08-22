<script setup>
import { storeToRefs } from 'pinia';
import { useTreeStore } from '~~/store/trees';

let treeStore = useTreeStore();

let {activeTreeData} = storeToRefs(treeStore);
const problems = computed(()=> activeTreeData.value.problems ? activeTreeData.value.problems.split(',') : ['Not Recorded'])

console.log(activeTreeData.value)
</script>

 <template>
     <h3 class="font-bold">Vitals:</h3>
        <p>Status: <span>{{activeTreeData.status}}</span></p>
        <p v-show="activeTreeData.status === 'Alive'">Health: <span>{{activeTreeData.health}}</span></p>
        <p v-show="activeTreeData.status === 'Alive' || activeTreeData.status === 'Dead' ">Trunk Diameter: <span>{{activeTreeData.tree_dbh}}</span> inches</p>
        <p v-show="activeTreeData.status === 'Stump'">Stump Diameter: <span>{{activeTreeData.stump_diam}}</span> inches</p>
        <p>Problems:</p>
        <ul class="ml-5 list-disc">
            <li v-for="(problem, index) in problems" :key="index">{{problem}}</li>
        </ul>
 </template>