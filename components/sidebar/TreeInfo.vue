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

   // helpers
   const titleToWords = (text)=>{
      const separateWords = text.replace(/([A-Z])/g, " $1");
      return separateWords;
   }   // computed props
   const specie = computed(() => activeTreeData.value.spc_common ? activeTreeData.value.spc_common[0].toUpperCase() + activeTreeData.value.spc_common.slice(1) : 'Not recorded');
   const problems = computed(()=> activeTreeData.value.problems ? titleToWords(activeTreeData.value.problems) : 'Not Recorded');
   const trunkDiameter = computed(()=> activeTreeData.value.tree_dbh ? activeTreeData.value.tree_dbh + ' inches' : '');
   const stumpDiameter = computed(()=> activeTreeData.value.stump_dbh ? activeTreeData.value.stump_dbh + ' inches' : '');


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
               altText="icon of at symbol"
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
               v-show="activeTreeData.status === 'Alive' || activeTreeData.status === 'Dead'"
               :icon="rulerIcon"
               altText="icon of a ruler"
               :treeData="[{key:'Trunk Diameter', value: trunkDiameter}]"
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
                  {key:'Sidewalk Damage', value: titleToWords(activeTreeData.sidewalk)},
                  {key:'Guards', value: titleToWords(activeTreeData.guards)},
                  {key:'Curb Location', value: titleToWords(activeTreeData.curb_loc)},
                  {key:'Root Problem', value: titleToWords(activeTreeData.root_stone)},
                  ]"
            />
         </div>
      <div v-else>
         <p class=" rounded-b-lg p-3 text-center">Click on a tree to display data</p>
      </div>
   </div>
</template>