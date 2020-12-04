/* 
AUTH: minggang@outlook.com
TIME: 2019/12/28
USAGE: INDIA MGI FACTORY LES LOG
*/
if ($(window).width() > 9910) {
    var total = window.innerHeight;
    document.getElementById("title").style.height = total * 0.1 + "px";
    document.getElementById("main").style.height = total * 0.9 + "px";
    title = document.getElementById("title");
    main = document.getElementById("main");
    //box02 = document.getElementById("box02");
    box03 = document.getElementById("manul_1");
    //box04 = document.getElementById("box04");
    title_h = title.offsetHeight;
    main_h = main.offsetHeight;
    //box02_h = box02.offsetHeight;
    //box03_h = box03.offsetHeight;
    //box04_h = box04.offsetHeight;
    document.getElementById("box01").style.height = main_h * 0.65 + "px";
    document.getElementById("box8-box").style.height = main_h * 0.3 + "px";
    box02.style.height = main_h * 0.62 + "px";
    document.getElementById("box9-box").style.height = main_h * 0.3 + "px";
    box03.style.height = main_h * 0.475 + "px";
    box04.style.height = main_h * 0.475 + "px";
    box01 = document.getElementById("box01");
    box01_h = box01.offsetHeight;
    document.getElementById("total-mn1").style.height = box01_h * 0.02 + "px";
    document.getElementById("total-mn2").style.height = box01_h * 0.02 + "px";
    document.getElementById("live-box").style.height = box01_h * 0.05 + "px";
    //document.getElementById("ym-menu").style.height = box03_h * 0.1 + "px"
};
var app = angular.module('myApp', []);
app.controller('customersCtrl', function($scope, $http, $interval) {
    $scope.pager = {
        parts: {ps: 7, pi: 1, pc:1},
        sheets: {ps: 7, pi: 1, pc:1},
        overflow: {ps: 10, pi: 1, pc:1},
        lack: {ps: 10, pi: 1, pc:1},
    };
    var timer1, timer2, timer3;
    var getChart = function() {
        $http({
            method: 'get',
            url: API_HOST + 'api/dashboard/getCustChart'
        }).then(function(res) {
            if(res.data.successful){
                var custs = res.data.data;
                renderChart('manul', custs.manul, timer1);
                renderChart('smpv', custs.smpv, timer2);
                renderChart('smcv', custs.smcv, timer3);
            }else{
                console.error(res.data);
            }
        });
    }
    var renderChart = function(cid, dt, timer) {        
        var dom = document.getElementById('chart_' + cid);
        var myChart = echarts.init(dom);
        let i = 0;
        if(timer) {
            clearInterval(timer);
        }
        timer = $interval(function(){
            switch(cid) {
                case 'manul':
                    $scope.manul_no = dt[i].cust_order_no;
                    $scope.manul_length = dt.length;
                    $scope.manul_cur = i + 1;
                    break;
                case 'smpv':
                    $scope.smpv_no = dt[i].cust_order_no;
                    $scope.smpv_length = dt.length;
                    $scope.smpv_cur = i + 1;
                    break;
                case 'smcv':
                    $scope.smcv_no = dt[i].cust_order_no;
                    $scope.smcv_length = dt.length;
                    $scope.smcv_cur = i + 1;
                    break;
            }            
            option = getChartOption(dt[i]);
            myChart.setOption(option);
            if(i < dt.length - 1){
                i++;
            } else {
                i = 0;
            }
        }, 1000 * 20, -1);
        window.onresize = function() {
            myChart.resize()
        };
    }
    var getData = function(){
        $http({
            method: 'post',
            //url: 'js/da.json',
            url: API_HOST + 'api/dashboard/getdb',
            data: $scope.pager
        }).then(function(res) {
            if(res.data.successful){
                let dt = res.data.data;
                $scope.sheets = dt.sheets;
                $scope.daily_report = dt.daily_report;
                $scope.sap_summary = dt.sap_summary;
                $scope.pager = dt.pager;
            }else{
                console.error(res.data);
            }
        });
    }
    var getChartOption = function(d) {
        var option = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                x: 'center',
                y: 'bottom',
                textStyle: { color:'#ccc'},
                data: ['Receipt Qty', 'Transit Qty', 'Pending Qty']
            },
            series: [
                {
                    name:'KD',
                    type:'pie',
                    radius: ['40%', '55%'],
                    label: {
                        normal: {
                            formatter: '{b|{b}}\n{c}',
                            rich: {
                                b: {
                                    fontSize: 12,
                                    lineHeight: 12
                                }
                            }
                        }
                    },
                    data: [
                        { name: 'Receipt Qty', value: d.receipt }, 
                        { name: 'Transit Qty', value: d.transit }, 
                        { name: 'Pending Qty', value: d.pending }
                    ]
                }
            ]
        };
        return option;
    }
    // 先加载一次
    getChart();
    getData();

    // 定时刷新页面
    $interval(function(){
        getData()
    }, 1000 * 120, -1);
});