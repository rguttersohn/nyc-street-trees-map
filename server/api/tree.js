const getTree = async (event)=>{
    const {req} = event.node;
    const url = new URL(`${req.originalUrl}`, useRuntimeConfig().public.baseURL);
    const searchParams = url.searchParams;
    const activeTreeID = searchParams.get('active_tree_id');
    const apiToken = useRuntimeConfig().treesAPIKey;
    const fetchURL = `https://data.cityofnewyork.us/resource/uvpi-gqnh.json?$$app_token=${apiToken}&tree_id=${activeTreeID}`;
    const data = await $fetch(fetchURL);
    
    return data;
}

export default defineEventHandler(getTree)