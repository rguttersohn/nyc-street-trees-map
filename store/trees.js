import { defineStore } from "pinia";
import { useCDStore } from "./cd";


export const useTreeStore = defineStore({
    id:'trees',
    state: ()=>({
        treeData:{
            type: 'FeatureCollection',
            features: [],
        },
        currentOffset: 0,
        activeTree:{activeTreeID: 0},
       
    }),
    actions: {
        
        async getTreeData(){
            let baseURL = useRuntimeConfig().public.baseURL;
            let cdStore = useCDStore();
            let {activeCD} = cdStore;
            await fetch(`${baseURL}/api/trees?activeCommunityDistrict=${activeCD}&currentOffset=${this.currentOffset}`)
                .then(response => response.json())
                .then(data => data.features.forEach(feature=>this.treeData.features.push(feature)));

        },
        async getActiveTree(clickedTreeID){

            let baseURL = useRuntimeConfig().public.baseURL;

            commit('setClickedTreeID', clickedTreeID)
            let {activeTreeID} = this.activeTree;
            fetchURL = `${baseURL}api/tree?active_tree_id=${activeTreeID}`;
            await fetch(fetchURL)
            .then(response => response.json())
            .then(fetchedTreeData => {
                Object.assign(this.activeTree, fetchedTreeData)
            })
        },
        emptyTreeData(){
            this.treeData = {
                type: 'FeatureCollection',
                features: [],
            };
        },
        increaseOffset(){
            this.currentOffset = this.currentOffset + 5000
        },
        resetOffset(){
            this.currentOffset = 0;
        }
    }
})