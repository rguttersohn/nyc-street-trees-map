import ApexCharts from "apexcharts";

export const makeLineChart = (chartGlobal, id, data, color)=>{

    const options = { 
        series: [{
            data: Object.values(data.series)
        }],
        chart:{
            type:'line',
            toolbar: {
                show: false
            },
            width:'100%',
            height:'150px'
        },
        stroke: {
            curve: 'smooth',
            width: 2,
            dashArray: 1
        },
        markers: {
            size: 5
        },
        xaxis: {
            categories: Object.values(data.categories),
            tickAmount: 3,
        },
        yaxis: {
            labels: {
                formatter: function (value){
                    return value.toLocaleString()
                }
            }},
        colors:[color]
    }

    const chart = new ApexCharts(id, options)
    chartGlobal.chart = chart;
    chart.render()
}

export const updateLineChart = (chartGlobal, data)=>{
    chartGlobal.chart.updateSeries([{
        data: Object.values(data.series)
    }])
}