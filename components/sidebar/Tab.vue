<script setup>
    import { storeToRefs } from 'pinia';
    import { useSideBarStore } from '~~/store/sidebar';

    const sideBarStore = useSideBarStore();
    
    const {activeTab} = storeToRefs(sideBarStore);
    const {setActiveTab} = sideBarStore
    const props = defineProps({
        tabName: String,
        imageSrc: String
    })
</script>

<template>
    <button
          :class="{
            'hover:bg-blue-50 cursor-pointer': activeTab !== props.tabName,
            ' bg-blue-50': activeTab === props.tabName,
          }"
          class="w-full py-1 px-3 rounded-t-lg text-center"
          @click="setActiveTab(props.tabName)"
          :data-tab-name="props.tabName"
        >
            <img class="block mx-auto" style="height:20px;width:20px" :src="props.imageSrc">
            <h3><slot></slot></h3>
        </button>
</template>