
export default async (request, response) => {

    const url = new URL(`${request.originalUrl}`, 'http://locahost:3000');
    const searchParams = url.searchParams;
    const apiToken = "2bM3R1t1qsII8obbXmAKbI8Jd";
    const currentOffset = searchParams.get('currentOffset');
    const activeCommunityDistrict = searchParams.get('activeCommunityDistrict');
    const fetchURL = `https://data.cityofnewyork.us/resource/uvpi-gqnh.geojson?$$app_token=${apiToken}&$limit=5000&$offset=${currentOffset}&$select=tree_id,longitude,latitude,status,health&cb_num=${activeCommunityDistrict}`
    const data = await $fetch(fetchURL);
    for(let i = 0 ; i < data.features.length; i++){
        data.features[i].geometry = {type: 'Point', 'coordinates' : []};
        data.features[i].geometry.coordinates.push(parseFloat(data.features[i].properties.longitude).toFixed(6), parseFloat(data.features[i].properties.latitude).toFixed(6));
}
    response.write(JSON.stringify(data))
    response.end();
}