<script setup>
    let props = defineProps({
        header: String,
        icon: String,
        altText: String,
        treeData: Array,
        color: String,
    })
</script>

<template>
    <div class="my-3">
        <img :src="props.icon" :alt="props.altText" class="block mx-auto">
        <h4 class="font-semibold" v-if="props.header">{{props.header}}</h4>
        <ul>
            <li 
                v-for="({key, value}, index) in props.treeData" 
                :key="index"
                class="capitalize"
                >
                <h4 class="font-semibold"
                :class="props.color"
                >{{key}}:</h4> 
                <h4>{{value}}</h4>
            </li>
        </ul>
    </div>
</template>