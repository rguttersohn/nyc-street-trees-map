import { parserOptions } from '@vue/compiler-dom';
import mapboxgl from 'mapbox-gl';
import { storeToRefs } from 'pinia';

export const renderMap = ( globals, startingCoords ) => {
  
  mapboxgl.accessToken = useRuntimeConfig().public.mapToken;

  const map = new mapboxgl.Map({
    container: 'map-holder', // container ID
    style: 'mapbox://styles/mapbox/light-v10?optimize=true',
    center: startingCoords, // starting position [lng, lat]
    zoom: 14, // starting zoom
    maxZoom: 19,
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
        'fill-color' : '#3B82F6',
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
  const {setActiveTab} = sideBarStore;

  globals.map.on('click','community districts fill', event => {  

    if(activeCD !== event.features[0].properties.BoroCD){
      
      setActiveCD(event.features[0].properties.BoroCD);
      resetOffset();
      emptyTreeData();
      getTreeData();
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
    
    console.log(activeFilter.filterArray);
    
    globals.map.addLayer({
      id: 'unclustered-trees',
      type: 'circle',
      source: 'trees',
      filter: ['!', ['has', 'point_count']],
      paint: {
        'circle-color': activeFilter.filterArray,
        'circle-radius': [
          "interpolate", ["linear"],["zoom"],
          12, 1,
          13, 2, 
          16, 4,
          19, 8,
      ],
      },
    });
}

export const resetPaint = (globals, filtersStore) =>{
  let {activeFilter} = storeToRefs(filtersStore);
  globals.map.setPaintProperty('unclustered-trees','circle-color', activeFilter.value.filterArray)
}
    
export const addData = (data, globals, treeStore)=>{
  let { increaseOffset } = treeStore;
  globals.map.getSource('trees').setData(data);
  increaseOffset();
}


export const addPlotPointEvents = (globals, treeStore, sideBarStore, popupRef) => {

   
    const {getActiveTreeData, setActiveTreeID, emptyActiveTreeData} = treeStore;
    const {setSideBarFalse} = sideBarStore;
    const {activeTreeID} = storeToRefs(treeStore);

  
    globals.map.on('click', (event) => {
      const features = globals.map.queryRenderedFeatures(event.point, {
        layers: ['unclustered-trees'],
      });

      if (!features.length) {
        return;
      }

      let {longitude, latitude} = features[0].properties

      globals.map.flyTo({
        center: [longitude,latitude],
        zoom: 19,
        padding: {top: 200},
      })
      const popup = new mapboxgl.Popup();
      popup.setLngLat([longitude,latitude]);
      popup.setDOMContent(popupRef);
      popup.addTo(globals.map);

      if(popup.isOpen()){
        popupRef.classList.remove('hidden')
      }

      if (features[0].properties.tree_id !== globals.lastTreeID) {
        setActiveTreeID(features[0].properties.tree_id)
        getActiveTreeData();
        globals.lastTreeID = activeTreeID;
      }

      popup.on('close', ()=>{
        emptyActiveTreeData()
        setSideBarFalse();
      })


    });

    globals.map.on('mouseenter', 'unclustered-trees', () => {
      globals.map.getCanvas().style.cursor = 'pointer';
    });

    globals.map.on('mouseleave', 'unclustered-trees', () => {
      globals.map.getCanvas().style.cursor = '';
    });

   

};

export const recenterMap = (globals, cdStore) =>{
  let {getActiveCDCoords} = cdStore;
  globals.map.flyTo({
    center: getActiveCDCoords,
    zoom: 13
  })
}
