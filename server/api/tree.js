export default async (request, response)=>{
    const url = new URL(`${request.originalUrl}`, useRuntimeConfig().public.baseURL);
    const searchParams = url.searchParams;
    const activeTreeID = searchParams.get('active_tree_id');
    const apiToken = useRuntimeConfig().treesAPIKey;
    const fetchURL = `https://data.cityofnewyork.us/resource/uvpi-gqnh.json?$$app_token=${apiToken}&tree_id=${activeTreeID}`;
    const data = await $fetch(fetchURL);
    response.write(JSON.stringify(data))
    response.end();
}