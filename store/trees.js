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
        activeTreeData: {},
        activeTreeID: 0,
       
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
        async getActiveTreeData(){

            let baseURL = useRuntimeConfig().public.baseURL;

            let fetchURL = `${baseURL}/api/tree?active_tree_id=${this.activeTreeID}`;
            await fetch(fetchURL)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.activeTreeData = data[0]})
        },
        setActiveTreeID(value){
            this.activeTreeID = value
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