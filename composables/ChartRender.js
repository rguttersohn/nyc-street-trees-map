import ApexCharts from "apexcharts";

export const makeLineChart = (chartGlobal, id, data, color)=>{

    const options = { 
        series: [{
            name: 'Trees',
            data: Object.values(data.series)
        }],
        chart:{
            type:'line',
            toolbar: {
                show: false
            },
            width:'90%',
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
        },
        yaxis: {
            labels: {
                formatter: function (value){
                    return value.toLocaleString()
                }
            },
        },
        colors:color,
        dataLabels:{
            enabled:true,
            formatter: function (value){
                return value.toLocaleString()
            },
            textAnchor:'left',
            offsetX:-3
        },
        tooltip:{
            enabled:false
        }
    }

    const chart = new ApexCharts(id, options)
    chartGlobal.lineChart = chart;
    chart.render()
}

export const updateLineChart = (chartGlobal, data)=>{
    chartGlobal.lineChart.updateSeries([{
        data: Object.values(data.series)
    }])
}

export const makeBarChart = (chartGlobal, id, data, color)=>{

    const options = { 
        series: data,
        chart:{
            stacked: true,
            type:'bar',
            toolbar: {
                show: false
            },
            width:'90%',
            height:'350px'
        },
        yaxis: {
            show:false,
        },
        xaxis:{
            categories:['2015'],
        },
        colors:color,
        dataLabels:{
            enabled:true,
            formatter: function (value){
                return value.toLocaleString()
            },
        },
        tooltip:{
            enabled:false
        }

    }

    const chart = new ApexCharts(id, options)
    chartGlobal.barChart = chart;
    chart.render()

}

export const updateBarChart = (chartGlobal, data)=>{
    chartGlobal.barChart.updateSeries(data)

}