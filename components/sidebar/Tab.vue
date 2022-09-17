<script setup>
    import { propsToAttrMap } from '@vue/shared';
import { storeToRefs } from 'pinia';
    import { useSideBarStore } from '~~/store/sidebar';

    // images
    import closeIcon from 'assets/img/close.svg'

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
            'hover:bg-green-50 cursor-pointer': activeTab !== props.tabName,
            'bg-green-100' : sideBarActive && activeTab === props.tabName,
            'bg-none hover:bg-green-50' : !sideBarActive
          }"
          class="w-full rounded-lg py-2 px-3 text-center"
          @click="handleTabClick"
          :data-tab-name="props.tabName"
        >
            <div v-show="props.tabName !== activeTab || !sideBarActive">
                <img class="block mx-auto" style="height:20px;width:20px" :src="props.imageSrc">
                <h4><slot></slot></h4>
            </div>
            <img v-show="props.tabName === activeTab && sideBarActive" :src="closeIcon" alt="icon of an X" class="block mx-auto" style="height:30px;width:30px">

        </button>
</template>