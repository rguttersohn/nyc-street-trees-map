export default async (request, response)=>{
    const url = new URL(`${request.originalUrl}`, useRuntimeConfig().public.baseURL);
    const searchParams = url.searchParams;
    const activeTreeID = searchParams.get('active_community_district');
    const apiToken = useRuntimeConfig().treesAPIKey;
    const fetchURL = `https://data.cityofnewyork.us/resource/uvpi-gqnh.json?$$app_token=${apiToken}&tree_id=${activeTreeID}`;
    const data = await $fetch(fetchURL);
    response.write(JSON.stringify(data))
    response.end();

    // fetch(`https://data.cityofnewyork.us/resource/kyad-zm4j.json?$$app_token=${apiToken}&cb_new=${activeCommunityDistrict}&$select=count(cb_original)`)
//     .then(resp => resp.json())
//     .then(data => seriesData.push(data[0]["count_cb_original"]))
// fetch(`https://data.cityofnewyork.us/resource/29bw-z7pj.json?$$app_token=${apiToken}&cb_num=${activeCommunityDistrict}&$select=count(cb_num)`)
//     .then(response => response.json())
//     .then(data => seriesData.push(data[0]["count_cb_num"]))
// fetch(`https://data.cityofnewyork.us/resource/uvpi-gqnh.json?$$app_token=${apiToken}&cb_num=${activeCommunityDistrict}&status=Alive&$select=count(cb_num)`)
//     .then(response => response.json())
    // .then(data => seriesData.push(data[0]["count_cb_num"]))
}