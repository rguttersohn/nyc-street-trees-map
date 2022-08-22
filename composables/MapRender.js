import mapboxgl from 'mapbox-gl';
import { computed } from 'vue';
import { storeToRefs } from 'pinia';

export const renderMap = ( globals, startingCoords ) => {
  
  mapboxgl.accessToken = useRuntimeConfig().public.mapToken;

  const map = new mapboxgl.Map({
    container: 'map-holder', // container ID
    style: 'mapbox://styles/mapbox/light-v10?optimize=true',
    center: startingCoords, // starting position [lng, lat]
    zoom: 14, // starting zoom
    maxZoom: 16,
    minZoom: 11
  });

  map.dragRotate.disable();
 
  map.touchZoomRotate.disableRotation();
  globals.map = map;

  globals.map.on('load', () => (globals.loaded = true));
};

export const renderCDMap = (globals, cdStore)=>{

    let {activeCD} = cdStore;

    globals.map.addSource('community districts', {
      type:'geojson',
      data: 'https://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/NYC_Community_Districts/FeatureServer/0/query?where=1=1&outFields=*&outSR=4326&f=pgeojson'
    })

    globals.map.addLayer({
      id: 'community districts fill',
      type: 'fill',
      source: 'community districts',
      layout: {},
      paint: {
        'fill-color' : '#0099cd',
        'fill-opacity' : 0.3,
      },
      'filter': ['!=', 'BoroCD', parseInt(activeCD)]
    })

    globals.map.addLayer({
      id: 'community districts outline',
      type: 'line',
      source: 'community districts',
      layout: {},
      paint: {
        'line-width' : 1,
        'line-color' : '#0099cd'
      }
    })

}

export const addCDEvents = (globals, cdStore, treeStore, sideBarStore)=>{
  
  const {activeCD} = storeToRefs(cdStore);
  const {setActiveCD} = cdStore;
  const {resetOffset, emptyTreeData, getTreeData} = treeStore;
  const {setSideBarTrue, setActiveTab} = sideBarStore;

  globals.map.on('click','community districts fill', event => {  

    if(activeCD !== event.features[0].properties.BoroCD){
      
      setActiveCD(event.features[0].properties.BoroCD);
      resetOffset();
      emptyTreeData();
      getTreeData();
      setSideBarTrue();
      setActiveTab('cd');

    }
  });

  globals.map.on('mouseenter', 'community districts fill', event => {
    if(activeCD !== event.features[0].properties.boroCD){
      globals.map.getCanvas().style.cursor = 'pointer';
    }
  });
     
  globals.map.on('mouseleave', 'community districts fill', () => {
    globals.map.getCanvas().style.cursor = '';
  });
}


export const refilterCDMap = (globals, cdStore) =>{
  let {activeCD} = cdStore;
      globals.map.setFilter(
        'community districts fill',
        ['!=', 'BoroCD', parseInt(activeCD)]
      )
} 

export const initPlotPoints = ( globals, filtersStore) => {
  let {activeFilter} = filtersStore;
  
  globals.map.addSource('trees', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [],
      },
      cluster: false,
      clusterRadius: 60,
      buffer: 128,
    });
    
    
    globals.map.addLayer({
      id: 'unclustered-trees',
      type: 'circle',
      source: 'trees',
      filter: ['!', ['has', 'point_count']],
      paint: {
        'circle-color': activeFilter.filterArray,
        'circle-radius': 4,
      },
    });
}

export const resetPaint = (globals, store) =>{
  const activeFilter = computed(()=>store.state.activeFilter);
  globals.map.setPaintProperty('unclustered-trees','circle-color', activeFilter.value.filterArray())
}
    
export const addData = (data, globals, treeStore)=>{
  let { increaseOffset } = treeStore;
  globals.map.getSource('trees').setData(data);
  increaseOffset();
}


export const addPlotPointEvents = (globals, treeStore, sideBarStore) => {

   
    const {setSideBarTrue, toggleSideBar, setActiveTab} = sideBarStore;
    const {getActiveTreeData, setActiveTreeID} = treeStore;
    const {activeTreeID} = storeToRefs(treeStore);

  
    globals.map.on('click', (event) => {
      const features = globals.map.queryRenderedFeatures(event.point, {
        layers: ['unclustered-trees'],
      });

      if (!features.length) {
        return;
      }

      if (features[0].properties.tree_id !== globals.lastTreeID) {
        setActiveTreeID(features[0].properties.tree_id)
        getActiveTreeData();
        setSideBarTrue();
        setActiveTab('tree');
        globals.lastTreeID = activeTreeID;
      } else {
        toggleSideBar();
      }
    });

};

export const recenterMap = (globals, cdStore) =>{
  let {getActiveCDCoords} = cdStore;
  globals.map.flyTo({
    center: getActiveCDCoords,
    zoom: 13
  })
}
