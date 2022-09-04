<script setup>
    import { propsToAttrMap } from '@vue/shared';
import { storeToRefs } from 'pinia';
    import { useSideBarStore } from '~~/store/sidebar';

    const sideBarStore = useSideBarStore();
    
    const {activeTab, sideBarActive} = storeToRefs(sideBarStore);
    const {setActiveTab, toggleSideBar, setSideBarTrue} = sideBarStore;
    const props = defineProps({
        tabName: String,
        imageSrc: String
    })

    const handleTabClick = ()=>{
        if(activeTab.value === props.tabName){
            toggleSideBar();
        } else {
            setSideBarTrue();
        }
        setActiveTab(props.tabName);
    }
</script>

<template>
    <button
          :class="{
            'hover:bg-blue-50 cursor-pointer': activeTab !== props.tabName,
            'cursor-default': activeTab === props.tabName,
            'bg-blue-50' : sideBarActive && activeTab === props.tabName,
            'bg-none hover:bg-blue-50' : !sideBarActive
          }"
          class="w-full rounded-lg py-2 px-3 text-center"
          @click="handleTabClick"
          :data-tab-name="props.tabName"
        >
            <img class="block mx-auto" style="height:20px;width:20px" :src="props.imageSrc">
            <h4><slot></slot></h4>
        </button>
</template>