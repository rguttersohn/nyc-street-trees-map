export default async (request, response) => {

    const apiToken = "2bM3R1t1qsII8obbXmAKbI8Jd";
    const currentOffset = 0;
    const activeCommunityDistrict = '109';

    const data = await $fetch(`https://data.cityofnewyork.us/resource/uvpi-gqnh.geojson?$$app_token=${apiToken}&$limit=20000&$offset=${currentOffset}&$select=tree_id,longitude,latitude,status,health&cb_num=${activeCommunityDistrict}`);
    for(let i = 0 ; i < data.features.length; i++){
        data.features[i].geometry = {type: 'Point', 'coordinates' : []};
        data.features[i].geometry.coordinates.push(parseFloat(data.features[i].properties.longitude).toFixed(6), parseFloat(data.features[i].properties.latitude).toFixed(6));
}
    response.write(JSON.stringify(data))
    response.end();
}