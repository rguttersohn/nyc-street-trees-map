<script setup>
   import { storeToRefs } from 'pinia';
   import { useTreeStore } from '~~/store/trees';
   import {useSideBarStore} from '~~/store/sidebar';

   // images
   import treeIcon from '~/assets/img/nature_FILL0_wght400_GRAD0_opsz48.svg';
   import apartmentIcon from '~/assets/img/apartment_FILL0_wght400_GRAD0_opsz48.svg';
   import rulerIcon from '~/assets/img/straighten_FILL0_wght400_GRAD0_opsz48.svg';
   import monitorIcon from '~/assets/img/monitor_heart_FILL0_wght400_GRAD0_opsz48.svg';
   import problemIcon from '~/assets/img/error_FILL0_wght400_GRAD0_opsz48.svg';
   import statusIcon from '~/assets/img/status.svg'
   

   let sideBarStore = useSideBarStore();
   let treeStore = useTreeStore();
   let {activeTreeData} = storeToRefs(treeStore);
   let {sideBarActive} = storeToRefs(sideBarStore);

   // computed props
   const specie = computed(() => activeTreeData.value.spc_common ? activeTreeData.value.spc_common[0].toUpperCase() + activeTreeData.value.spc_common.slice(1) : 'Not recorded');
   const problems = computed(()=> activeTreeData.value.problems ? activeTreeData.value.problems : 'Not Recorded')

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
               color="text-green-500"
               />
            <SidebarTreeCard 
               :icon="apartmentIcon" 
               altText="icon of an apartment building"
               :treeData="[{key:'Address', value: activeTreeData.address.toLowerCase()}]"
               />
            <SidebarTreeCard
               :icon="statusIcon"
               altText="icon of a bulleted list"
               :treeData="[{key:'Status', value: activeTreeData.status}]"
               color="text-yellow-500"
            />
            <SidebarTreeCard
               v-show="activeTreeData.status === 'Alive'"
               :icon="monitorIcon"
               altText="icon of a heart monitor"
               :treeData="[{key:'Health', value: activeTreeData.health}]"
               color="text-red-600"
            />
            <SidebarTreeCard
               v-show="activeTreeData.status === 'Alive' || activeTreeData.status === 'Dead'"
               :icon="rulerIcon"
               altText="icon of a ruler"
               :treeData="[{key:'Trunk Diameter', value: activeTreeData.tree_dbh}]"
               color="text-amber-600"
            />
            <SidebarTreeCard
               v-show="activeTreeData.status === 'Stump'"
               :icon="rulerIcon"
               altText="icon of a ruler"
               :treeData="[{key:'Stump Diameter', value: activeTreeData.stump_diam}]"
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