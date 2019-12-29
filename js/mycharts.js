if ($(window).width() > 9910) {
    var total = window.innerHeight;
    document.getElementById("title").style.height = total * 0.1 + "px";
    document.getElementById("main").style.height = total * 0.9 + "px";
    title = document.getElementById("title");
    main = document.getElementById("main");
    box02 = document.getElementById("box02");
    box03 = document.getElementById("box03");
    box04 = document.getElementById("box04");
    title_h = title.offsetHeight;
    main_h = main.offsetHeight;
    box02_h = box02.offsetHeight;
    box03_h = box03.offsetHeight;
    box04_h = box04.offsetHeight;
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
app.controller('customersCtrl',
function($scope, $http) {
    $http({
        method: 'get',
        url: 'js/da.json'
    }).then(function(res) {
        $scope.parts = res.data.parts;
        $scope.sheets = res.data.sheets;
        $scope.daily_report = res.data.daily_report;
        $scope.listData1 = res.data.listData1;
        var worldMapContainer2 = document.getElementById('box2');
        //var box01 = document.getElementById("box01");
        //var box01_h = box01.offsetHeight;
        //var box01_w = box01.offsetWidth;
        //debugger
        var resizeWorldMapContainer2 = function() {
            worldMapContainer2.style.width = box01_w * 0.96 + 'px';
            worldMapContainer2.style.height = box01_h * 0.38 + 'px'
        };
        //resizeWorldMapContainer2();
        var myChart = echarts.init(worldMapContainer2);
        var option = {
            //color: ['#38b3f1'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                //bottom:0,
                textStyle:{color:'#ccc'},
                //padding:50,
                data: ['当前库存+在途库存', '最大库存']
            },
            textStyle: {
                color: '#ccc'
            },
            grid: {
                top: '10%',
                left: '3%',
                right: '3%',
                bottom: '6%',
                containLabel: true
            },
            xAxis: [{
                type: 'value',
                axisTick: {
                    alignWithLabel: true
                }
            }],
            yAxis: [{
                type: 'category',
                data: res.data.titleList,
            }],
            series: [{
                name: '当前库存+在途库存',
                type: 'bar',
                color:'#22DD92',
                barWidth: '20%',
                data: res.data.now_and_way
            },
            {
                name: '最大库存',
                type: 'bar',
                color:'#EEC591',
                barWidth: '10%',
                data: res.data.max_storage
            }]
        };
        myChart.setOption(option);
        window.onresize = function() {
            resizeWorldMapContainer2();
            myChart.resize()
        };
        myChart = echarts.init(document.getElementById('box4'));
        myChart.setOption(option);
        var worldMapContainer = document.getElementById('box3');
        box03 = document.getElementById("box03");
        box03_h = box03.offsetHeight;
        box03_w = box04.offsetWidth;
        var resizeWorldMapContainer = function() {
            //worldMapContainer.style.width = box03_w * 0.8 + 'px';
            worldMapContainer.style.height = box03_h * 1.1 + 'px'

            //worldMapContainer.style.width = box03_w+'px';
        };
        resizeWorldMapContainer();
        var myChart = echarts.init(worldMapContainer);
        var option = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                x: 'center',
                y: 'bottom',
                textStyle:{ color:'#ccc'},
                data: res.data.kd_titles
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
                    data: res.data.kd_list
                }
            ]
        };
        myChart.setOption(option);
        window.onresize = function() {
            resizeWorldMapContainer();
            myChart.resize()
        };
    });
});