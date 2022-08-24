export default async (request, response)=>{
    const url = new URL(`${request.originalUrl}`, useRuntimeConfig().public.baseURL);
    const searchParams = url.searchParams;
    const activeCD = searchParams.get('active_cd');
    const apiToken = useRuntimeConfig().treesAPIKey;
    
    const fetch2015URL = `https://data.cityofnewyork.us/resource/uvpi-gqnh.json?$$app_token=${apiToken}&cb_num=${activeCD}&$select=count(cb_num)`;
    const fetch2005URL = `https://data.cityofnewyork.us/resource/29bw-z7pj.json?$$app_token=${apiToken}&cb_num=${activeCD}&$select=count(cb_num)`;
    const fetch1995URL = `https://data.cityofnewyork.us/resource/kyad-zm4j.json?$$app_token=${apiToken}&cb_new=${activeCD}&$select=count(cb_original)`;
    
    const fetch2015URL_alive = `https://data.cityofnewyork.us/resource/uvpi-gqnh.json?$$app_token=${apiToken}&cb_num=${activeCD}&status=Alive&$select=count(cb_num)`;
    const fetch2015URL_dead = `https://data.cityofnewyork.us/resource/uvpi-gqnh.json?$$app_token=${apiToken}&cb_num=${activeCD}&status=Dead&$select=count(cb_num)`;
    const fetch2015URL_stump = `https://data.cityofnewyork.us/resource/uvpi-gqnh.json?$$app_token=${apiToken}&cb_num=${activeCD}&status=Stump&$select=count(cb_num)`;

    const trees_2015 = await $fetch(fetch2015URL);
    const trees_2005 = await $fetch(fetch2005URL);
    const trees_1995 = await $fetch(fetch1995URL);

    const trees_2015_alive = await $fetch(fetch2015URL_alive);
    const trees_2015_dead = await $fetch(fetch2015URL_dead);
    const trees_2015_stump = await $fetch(fetch2015URL_stump);

    const data = {
        'all': {categories: ['1995', '2005', '2015'],
            series: [trees_1995[0].count_cb_original, trees_2005[0].count_cb_num, trees_2015[0].count_cb_num,]
        },
        'status':[{
            name: "Alive",
            data: [trees_2015_alive[0].count_cb_num]
        },
        {
            name: "Dead",
            data: [trees_2015_dead[0].count_cb_num]
        },
        {
            name: "Stump",
            data: [trees_2015_stump[0].count_cb_num]
        },

    ]
    }
    
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