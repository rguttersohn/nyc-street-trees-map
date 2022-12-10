<script setup>
import { storeToRefs } from "pinia";
import { useCDStore } from "~~/store/cd";
import { useTreeStore } from "~~/store/trees"
// images
import dropDown from '~/assets/img/dropdown.svg';

// store data
    const cdStore = useCDStore();
    const treeStore = useTreeStore();
    const  { activeCD } = storeToRefs(cdStore);
    const {setActiveCD} = cdStore;
    const {resetOffset, emptyTreeData, getTreeData} = treeStore;

    

    // local data

    const cdSelectListShowing = ref(false);

    function toggleCDSelectList (){
        cdSelectListShowing.value = !cdSelectListShowing.value;
    }

    function hideCDSelectList(){
        cdSelectListShowing.value = false;
    }

    function selectCD (event){
        setActiveCD(event.target.value);
        resetOffset();
        emptyTreeData();
        getTreeData();
        hideCDSelectList();
    }


</script>

<template>
     <div class="w-full mx-auto overflow-x-hidden">
        <div 
          @click="toggleCDSelectList"
          class="w-3/4 mx-auto flex justify-around hover:bg-green-50 cursor-pointer"
          >
          <h2>Community District {{activeCD}}</h2>
          <img :src="dropDown" alt="">
        </div>
           <div
                class="w-full mx-auto overflow-x-scroll border-2 border-light-100 text-center"
                :class="{'h-0' : !cdSelectListShowing}, {'h-full' : cdSelectListShowing}"
                @change="selectCD" >
                <h4>Manhattan</h4>
               <ul label="Manhattan" class="cd-select-list">
                   <li data-cd="101">Financial District/Battery Park City/Tribeca</li>
                   <li data-cd="102">Greenwich Village/Soho</li>
                   <li data-cd="103">Lower Eastside/Chinatown</li>
                   <li data-cd="104">Clinton/Chelsea</li>
                   <li data-cd="105">Flatiron/Midtown</li>
                   <li data-cd="106">Gramercy/Murray Hill</li>
                   <li data-cd="107">Upper Westside</li>
                   <li data-cd="108">Upper Eastside</li>
                   <li data-cd="109">Morningside Heights/Hamilton Heights</li>
                   <li data-cd="110">Central Harlem</li>
                   <li data-cd="111">East Harlem</li>
                   <li data-cd="112">Washington Heights</li>
                </ul>
                <h4>Bronx</h4>
               <ul label="Bronx" class="cd-select-list">
                   <li data-cd="201">Mott Haven</li>
                   <li data-cd="202">Hunts Point</li>
                   <li data-cd="203">Morrisania/Claremont Village</li>
                   <li data-cd="204">Concourse/High Bridge</li>
                   <li data-cd="205">Morris Heights/University Heights</li>
                   <li data-cd="206">East Tremont/Belmont</li>
                   <li data-cd="207">Bedord Park</li>
                   <li data-cd="208">Riverdale/Kingsbridge</li>
                   <li data-cd="209">Soundview</li>
                   <li data-cd="210">Throgs Neck/Schuylerville</li>
                   <li data-cd="211">Morris Park/Pelham Parkway</li>
                   <li data-cd="212">Williamsbridge/Wakefield</li>
               </ul>
               <h4>Brooklyn</h4>
               <ul label="Brooklyn" class="cd-select-list">
                    <li data-cd="301">Greenpoint/Williamsburg</li>
                    <li data-cd="302">Brooklyn Heights/Downtown Brooklyn</li>
                    <li data-cd="303">Bedford-Stuyvesant</li>
                    <li data-cd="304">Bushwick</li>
                    <li data-cd="305">East New York</li>
                    <li data-cd="306">Gowanus/Carrol Gardens</li>
                    <li data-cd="307">Sunset Park</li>
                    <li data-cd="308">Prospect Heights/Crown Heights</li>
                    <li data-cd="309">Prospect Leffert Gardens</li>
                    <li data-cd="310">Bay Ridge</li>
                    <li data-cd="311">Bensonhurst</li>
                    <li data-cd="312">Borough Park</li>
                    <li data-cd="313">Brigton Beach/Coney Island</li>
                    <li data-cd="314">Midwood/Flatbush</li>
                    <li data-cd="315">Sheepshead Bay/Gravesend</li>
                    <li data-cd="316">Brownsville</li>
                    <li data-cd="317">East Flatbush</li>
                    <li data-cd="318">Canarsie/Flatlands</li>
                </ul>
                <h4>Staten Island</h4>
                <ul label="Staten Island" class="cd-select-list">
                   <li data-cd="501">North Shore</li>
                   <li data-cd="502">Heartland Village</li>
                   <li data-cd="503">South Shore</li>
               </ul>
               <h4>Queens</h4>
               <ul label="Queens" class="cd-select-list">
                   <li data-cd="401">Astoria</li>
                   <li data-cd="402">Sunnyside</li>
                   <li data-cd="403">Jackson Heights/East Elmhurst/North Corona</li>
                   <li data-cd="404">Elmhurst/South Corona</li>
                   <li data-cd="405">Ridgewood/Middle Village</li>
                   <li data-cd="406">Rego Park/Forest Hills</li>
                   <li data-cd="407">Flushing/Whitestone</li>
                   <li data-cd="408">Kew Gardens/Fresh Meadows</li>
                   <li data-cd="409">Woodhaven</li>
                   <li data-cd="410">Ozone Park</li>
                   <li data-cd="411">Oakland Gardens/Bayside</li>
                   <li data-cd="412">Jamaica</li>
                   <li data-cd="413">Floral Park/Queens Village/Cambria Heights</li>
                   <li data-cd="414">Rockaway/Breezy Point</li>
               </ul>
           </div>
     </div>
</template>