<script setup>
   import { storeToRefs } from 'pinia';
   import { useTreeStore } from '~~/store/trees';
   import {useSideBarStore} from '~~/store/sidebar';

   // images
   import treeIcon from '~/assets/img/nature_FILL0_wght400_GRAD0_opsz48.svg';
   import apartmentIcon from '~/assets/img/apartment_FILL0_wght400_GRAD0_opsz48.svg';
   import rulerIcon from '~/assets/img/straighten_FILL0_wght400_GRAD0_opsz48.svg';
   import monitorIcon from '~/assets/img/monitor_heart_FILL0_wght400_GRAD0_opsz48.svg';
   import listIcon from '~/assets/img/format_list_bulleted_FILL0_wght400_GRAD0_opsz48.svg';
   import problemIcon from '~/assets/img/error_FILL0_wght400_GRAD0_opsz48.svg';
   

   let sideBarStore = useSideBarStore();
   let treeStore = useTreeStore();
   let {activeTreeData} = storeToRefs(treeStore);
   let {sideBarActive} = storeToRefs(sideBarStore);

   // props

   const specie = computed(() => activeTreeData.value.spc_common ? activeTreeData.value.spc_common[0].toUpperCase() + activeTreeData.value.spc_common.slice(1) : 'Not recorded');

</script>

 <template>
   <div  
      :class="{'h-0 overflow-hidden py-0': !sideBarActive,  'h-fit py-3': sideBarActive }"
      class="transition-all duration-300 rounded-b-lg px-3 text-center"
   >
         <div 
            v-if="Object.keys(activeTreeData).length > 0"
            class="grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 gap-y-10 my-5">
            <SidebarTreeCard :icon="treeIcon" :treesData="[
               {
                  key: 'Species',
                  value: specie
               }
            ]" />
            <SidebarTreeProperties/>
            <SidebarTreeHealth/>
            <SidebarTreeSurroundingArea/>
         </div>
      <div v-else>
         <p class=" rounded-b-lg p-3 text-center">Click on a tree to display data</p>
      </div>
   </div>
</template>