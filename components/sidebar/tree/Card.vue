<script setup>
    let props = defineProps({
        header: String,
        icon: String,
        altText: String,
        treesData: Array
    })
</script>

<template>
    <div class="my-3">
        <h3>{{props.header}}</h3>
        <img :src="props.icon" alt="" class="block mx-auto">
        <ul>
            <li 
                v-for="(treeData, index) in props.treesData" 
                :key="index"
                class="capitalize"
                >
                <h3>{{treeData.key}}:</h3>
                <p>{{treeData.value}}</p>
            </li>
        </ul>
    </div>
</template>