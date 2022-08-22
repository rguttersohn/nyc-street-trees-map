import { defineStore } from "pinia";

export const useSideBarStore = defineStore({
    id: 'sidebar',
    state: ()=>({
        sideBarActive: false,
    }),
    actions: {
        toggleSideBar(){
            this.sideBarActive = !this.sideBarActive;
        },
        setSideBarTrue(){
            this.sideBarActive = true;
        },
        setSideBarFalse(){
            this.sideBarActive = false;
        },
    }
})