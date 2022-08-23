 <script setup>
 import { storeToRefs } from 'pinia';
import { useTreeStore } from '~~/store/trees';

 let treeStore = useTreeStore();
 let {activeTreeData} = storeToRefs(treeStore);
 </script>
 <template>
   <div v-if="Object.keys(activeTreeData).length > 0">
      <SidebarTreeInfo/>
       <SidebarTreeHealth/>
       <SidebarTreeSurroundingArea/>
   </div>
   <div v-else>
    <h3 class="text-center">Click on a tree to display data</h3>
   </div>
</template>