<script setup>
    let props = defineProps({
        header: String,
        icon: String,
        altText: String,
        treeData: Array,
    })

    const titleToWords = (text)=>{
      const separateWords = text.replace(/([A-Z])/g, " $1");
      return separateWords;
   }   

</script>

<template>
    <div class="my-3">
        <img :src="props.icon" :alt="props.altText" class="block mx-auto">
        <h4 class="my-3 font-semibold text-green-600" v-if="props.header">{{props.header}}</h4>
        <ul>
                <li
                    v-for="({key, value}, index) in props.treeData"
                    :key="index"
                    class="my-3 capitalize"
                    >
                    <template v-if="value">
                        <h4 class="font-semibold text-green-600"
                        >{{key}}:</h4>
                        <h4>{{titleToWords(value)}}</h4>
                    </template>
                </li>
        </ul>
    </div>
</template>