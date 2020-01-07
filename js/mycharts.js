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
app.controller('customersCtrl', function($scope, $http, $interval) {
    $scope.pager = {
        parts: {ps: 7, pi: 1, pc:1},
        sheets: {ps: 7, pi: 1, pc:1},
        overflow: {ps: 10, pi: 1, pc:1},
        lack: {ps: 10, pi: 1, pc:1},
    };
    var getData = function(){
        $http({
            method: 'post',
            //url: 'js/da.json',
            url: 'http://localhost:49280/api/dashboard/getdb',
            data: $scope.pager
        }).then(function(res) {
            if(res.data.successful){
                let dt = res.data.data;

                $scope.parts = dt.parts;
                $scope.sheets = dt.sheets;
                $scope.daily_report = dt.daily_report;
                $scope.pager = dt.pager;
                var worldMapContainer2 = document.getElementById('box2');
                //var box01 = document.getElementById("box01");
                //var box01_h = box01.offsetHeight;
                //var box01_w = box01.offsetWidth;
                //debugger
                var resizeWorldMapContainer2 = function() {
                    //worldMapContainer2.style.width = box01_w * 0.96 + 'px';
                    //worldMapContainer2.style.height = box01_h * 0.38 + 'px'
                };
                //resizeWorldMapContainer2();
                var myChart = echarts.init(worldMapContainer2);
                // overflow
                option = getIssueOption(dt.risk_overflow, 'Max');
                myChart.setOption(option);
                window.onresize = function() {
                    resizeWorldMapContainer2();
                    myChart.resize()
                };

                // lack
                option = getIssueOption(dt.risk_lack, 'Min');
                myChart = echarts.init(document.getElementById('box4'));
                myChart.setOption(option);


                var worldMapContainer = document.getElementById('box3');
                box03 = document.getElementById("box03");
                box03_h = box03.offsetHeight;
                box03_w = box04.offsetWidth;
                var resizeWorldMapContainer = function() {
                    //worldMapContainer.style.width = box03_w * 0.8 + 'px';
                    //worldMapContainer.style.height = box03_h * 1.1 + 'px'

                    //worldMapContainer.style.width = box03_w+'px';
                };
                resizeWorldMapContainer();
                var myChart = echarts.init(worldMapContainer);
                let _kd_titles = [];
                for(let i = 0; i< dt.kd_list.length; i++){
                    _kd_titles.push(dt.kd_list[i].name);
                }
                var option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    legend: {
                        x: 'center',
                        y: 'bottom',
                        textStyle:{ color:'#ccc'},
                        data: _kd_titles
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
                            data: dt.kd_list
                        }
                    ]
                };
                myChart.setOption(option);
                window.onresize = function() {
                    resizeWorldMapContainer();
                    myChart.resize()
                };
            }else{
                console.error(res.data);
            }
        });
    }

    var getIssueOption = function(d, t){
        let titles = [];
        let now_and_way = [];
        let max_storage = [];
        for(var i = 0; i<d.length; i++){
            titles.push(d[i].pno);
            now_and_way.push(d[i].now_way);
            max_storage.push(d[i].max);
        }
        var op = {
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
                data: ['Current+Way', t+' Stock']
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
                data: titles,
            }],
            series: [{
                name: 'Current+Way',
                type: 'bar',
                color:'#22DD92',
                barWidth: '20%',
                data: now_and_way
            },
            {
                name: t+' Stock',
                type: 'bar',
                color:'#f4e925',
                barWidth: '10%',
                data: max_storage
            }]
        };

        return op;
    }

    // 先加载一次
    getData();

    // 定时刷新页面
    $interval(function(){getData()}, 1000 * 30, -1);
});