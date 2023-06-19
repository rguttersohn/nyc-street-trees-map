<script setup>
useHead({
      link: [{ rel: 'stylesheet', href: 'https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css' }]
    }) 
</script>
<template>
    <main class="w-screen h-screen flex flex-col md:flex-row relative">
      <Map />
      <SideBar />
    </main>

</template>