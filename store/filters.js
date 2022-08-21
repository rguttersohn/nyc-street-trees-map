import { defineStore } from "pinia";

export const useFiltersStore = defineStore({
    id:'filters',
    state: ()=>({
        filters: [
            {
                filterName:'status',
                colors:['green', 'coral', 'red'],
                keys:['Alive', 'Dead', 'Stump'],
                get filterArray(){ return [ 
                    'match',
                    ['get', this.filterName],
                    this.keys[0],
                    this.colors[0],
                    this.keys[1],
                    this.colors[1],
                    this.keys[2],
                    this.colors[2],
                    'gray'
                ] 
                }
            },
            {
                filterName: 'health',
                colors: ['purple','blue','orange','gray'],
                keys: ['Good', 'Fair', 'Poor','Dead'],
                get filterArray(){ return [ 
                    'match',
                    ['get', this.filterName],
                    this.keys[0],
                    this.colors[0],
                    this.keys[1],
                    this.colors[1],
                    this.keys[2],
                    this.colors[2],
                    this.colors[3]
                ] 
            }
        }
        ],
        activeFilter:[], 
    }),
    actions: {
        setActiveFilter(value){
            this.filters.forEach(filter => {
                if(filter.filterName === value){
                    this.activeFilter = filter;
                }
            })
        },  
    }
})