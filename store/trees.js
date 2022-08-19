import { defineStore } from "pinia";

export const useTreeStore = defineStore({
    id:'trees',
    state: ()=>({
        treeData:{},
        currentOffset: 0,
        activeTree:{activeTreeID: 0},
    }),
    actions: {
        getTreeData(){
            fetch('http://localhost:3000/api/trees')
                .then(response => response.json())
                .then(data => this.treeData = data);
        }
    }
})