<script setup>
   import { storeToRefs } from 'pinia';
   import { useTreeStore } from '~~/store/trees';
   import {useSideBarStore} from '~~/store/sidebar';

   // images
   import treeIcon from '~/assets/img/tree.svg';
   import apartmentIcon from '~/assets/img/apartment.svg';
   import rulerIcon from '~/assets/img/ruler.svg';
   import monitorIcon from '~/assets/img/monitor.svg';
   import problemIcon from '~/assets/img/error.svg';
   import statusIcon from '~/assets/img/status.svg';
   import addressIcon from '~/assets/img/address.svg'
   

   let sideBarStore = useSideBarStore();
   let treeStore = useTreeStore();
   let {activeTreeData} = storeToRefs(treeStore);
   let {sideBarActive} = storeToRefs(sideBarStore);

   // computed props
   const specie = computed(() => activeTreeData.value.spc_common ? activeTreeData.value.spc_common[0].toUpperCase() + activeTreeData.value.spc_common.slice(1) : 'Not recorded');
   const problems = computed(()=> activeTreeData.value.problems ? activeTreeData.value.problems : 'Not Recorded');
   const trunkDiameter = computed(()=> activeTreeData.value.status == 'Stump' ? activeTreeData.value.stump_diam + ' in' : activeTreeData.value.tree_dbh + ' in');

</script>

 <template>
   <div  
      :class="{'h-0 overflow-hidden py-0': !sideBarActive,  'h-fit py-3': sideBarActive }"
      class="transition-all duration-300 rounded-b-lg px-3 text-center"
   >
         <div 
            v-if="Object.keys(activeTreeData).length > 0"
            class="grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 gap-y-10 my-5">
            <SidebarTreeCard 
               :icon="treeIcon" 
               altText="icon of a tree" 
               :treeData="[{key: 'Species', value: specie}]" 
               />
            <SidebarTreeCard 
               :icon="addressIcon" 
               altText="icon of an at symbol"
               :treeData="[{key:'Address', value: activeTreeData.address.toLowerCase()}]"
               />
            <SidebarTreeCard
               :icon="statusIcon"
               altText="icon of a falling leaf"
               :treeData="[{key:'Status', value: activeTreeData.status}]"
            />
            <SidebarTreeCard
               v-show="activeTreeData.status === 'Alive'"
               :icon="monitorIcon"
               altText="icon of a heart monitor"
               :treeData="[{key:'Health', value: activeTreeData.health}]"
            />
            <SidebarTreeCard
               :icon="rulerIcon"
               altText="icon of a ruler"
               :treeData="activeTreeData.status == 'Stump' ? [{key:'Stump Diameter', value: trunkDiameter}] : [{key:'Trunk Diameter', value: trunkDiameter}]"
            />
            <SidebarTreeCard
               :icon="problemIcon"
               altText="icon of an error notification"
               :treeData="[{key:'Tree Damage', value: problems}]"
            />
            <SidebarTreeCard
               :icon="apartmentIcon"
               altText="icon of an error notification"
               header="Surrounding Area Status"
               :treeData="[
                  {key:'Sidewalk Damage', value: activeTreeData.sidewalk},
                  {key:'Guards', value: activeTreeData.guards},
                  {key:'Curb Location', value: activeTreeData.curb_loc},
                  {key:'Root Problem', value: activeTreeData.root_stone},
                  ]"
            />
         </div>
      <div v-else>
         <p class=" rounded-b-lg p-3 text-center">Click on a tree to display data</p>
      </div>
   </div>
</template>