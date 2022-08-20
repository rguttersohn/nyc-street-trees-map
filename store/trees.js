import { defineStore } from "pinia";
import { useCDStore } from "./cd";


export const useTreeStore = defineStore({
    id:'trees',
    state: ()=>({
        treeData:{},
        currentOffset: 0,
        activeTree:{activeTreeID: 0},
       
    }),
    actions: {
        
        getTreeData(){
            let cdStore = useCDStore();
            let {activeCD} = cdStore;
            fetch(`http://localhost:3000/api/trees?activeCommunityDistrict=${activeCD}&currentOffset=${this.currentOffset}`)
                .then(response => response.json())
                .then(data => this.treeData = data);
        }
    }
})