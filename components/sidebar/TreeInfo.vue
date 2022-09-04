<script setup>
   import { storeToRefs } from 'pinia';
   import { useTreeStore } from '~~/store/trees';
   import {useSideBarStore} from '~~/store/sidebar';

   let sideBarStore = useSideBarStore();
   let treeStore = useTreeStore();
   let {activeTreeData} = storeToRefs(treeStore);
   let {sideBarActive} = storeToRefs(sideBarStore);
</script>

 <template>
   <div  
      :class="{'h-0 overflow-hidden py-0': !sideBarActive,  'h-fit py-3': sideBarActive }"
      class="transition-all duration-300 rounded-b-lg px-3 text-center"
   >
         <div v-if="Object.keys(activeTreeData).length > 0" >
            <SidebarTreeProperties/>
            <SidebarTreeHealth/>
            <SidebarTreeSurroundingArea/>
         </div>
      <div v-else>
         <p class=" rounded-b-lg p-3 text-center">Click on a tree to display data</p>
      </div>
   </div>
</template>