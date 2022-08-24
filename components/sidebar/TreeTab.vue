 <script setup>
 import { storeToRefs } from 'pinia';
import { useTreeStore } from '~~/store/trees';

 let treeStore = useTreeStore();
 let {activeTreeData} = storeToRefs(treeStore);
 </script>
 <template>
   <div v-if="Object.keys(activeTreeData).length > 0" 
      class="bg-blue-50 rounded-lg p-3 text-center"
   >
      <SidebarTreeInfo/>
       <SidebarTreeHealth/>
       <SidebarTreeSurroundingArea/>
   </div>
   <div v-else>
    <h3 class="bg-blue-50 rounded-lg p-3 text-center text-blue-600">Click on a tree to display data</h3>
   </div>
</template>