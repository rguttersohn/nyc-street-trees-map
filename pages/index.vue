<script setup>
import parkImage from '~/assets/img/park.svg';
</script>

<template>
    <main class="flex flex-col justify-center w-screen h-screen">
        <header aria-labelledby="intro-label" class="w-2/4 h-[50vh] py-10 mx-auto bg-green-300 rounded text-center">
            <div class="mx-auto h-20 w-20 bg-green-50">
                <img :src="parkImage" alt="">
            </div>
            <h1 id="intro-label">
                Welcome to NYC Street Trees.
            </h1>
            <div class="my-10 text-center">
                <p>NYC Street Trees tracks the health and living status of New York City's street trees.</p>
                <p> NYC Street Strees relies on data from the decennial street tree census and user-sumbitted data.</p>
            </div>
        
            <nav class="my-20" aria-labelledby="nav-label">
                <ul>
                    <li>
                        <nuxt-link to="/map">
                            <button class="bg-white p-3 rounded-lg">
                                Explore the map.
                            </button>
                        </nuxt-link>
                    </li>
                </ul>
            </nav>
        </header>
    </main>
</template>