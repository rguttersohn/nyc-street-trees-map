const getTrees = async (event) => {
    const {req} = event.node
    const url = new URL(`${req.originalUrl}`, useRuntimeConfig().public.baseURL);
    const searchParams = url.searchParams;
    const apiToken = useRuntimeConfig().treesAPIKey;
    const currentOffset = searchParams.get('currentOffset');
    const activeCommunityDistrict = searchParams.get('activeCommunityDistrict');
    const fetchURL = `https://data.cityofnewyork.us/resource/uvpi-gqnh.geojson?$$app_token=${apiToken}&$limit=5000&$offset=${currentOffset}&$select=tree_id,longitude,latitude,status,health&cb_num=${activeCommunityDistrict}`
    const data = await $fetch(fetchURL);
    for(let i = 0 ; i < data.features.length; i++){
        data.features[i].geometry = {type: 'Point', 'coordinates' : []};
        data.features[i].geometry.coordinates.push(parseFloat(data.features[i].properties.longitude).toFixed(6), parseFloat(data.features[i].properties.latitude).toFixed(6));
}
    return data;
}


export default defineEventHandler(getTrees);