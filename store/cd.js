import { defineStore } from "pinia";

export const useCDStore = defineStore({
    id:'cd',
    state: ()=>({
        activeCD: '101'
    }),
    actions:{
        setActiveCD(value){
            this.activeCD = value
        }
    }
})