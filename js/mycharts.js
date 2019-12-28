﻿if ($(window).width() > 9910) {
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
    document.getElementById("ym-menu").style.height = box03_h * 0.1 + "px"
};
var app = angular.module('myApp', []);
app.controller('customersCtrl',
function($scope, $http) {
    $http({
        method: 'get',
        url: 'js/da.json'
    }).then(function(res) {
        $scope.listHead = res.data.listHead;
        $scope.listContent = res.data.listContent;
        $scope.listData1 = res.data.listData1;
        var worldMapContainer2 = document.getElementById('box2');
        var box01 = document.getElementById("box01");
        var box01_h = box01.offsetHeight;
        var box01_w = box01.offsetWidth;
        var resizeWorldMapContainer2 = function() {
            worldMapContainer2.style.width = box01_w * 0.96 + 'px';
            worldMapContainer2.style.height = box01_h * 0.38 + 'px'
        };
        resizeWorldMapContainer2();
        var myChart = echarts.init(worldMapContainer2);
        var option = {
            color: ['#38b3f1'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
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
                type: 'category',
                data: res.data.titleList,
                axisTick: {
                    alignWithLabel: true
                }
            }],
            yAxis: [{
                type: 'value'
            }],
            series: [{
                name: '直接访问',
                type: 'bar',
                barWidth: '60%',
                data: res.data.dataList
            }]
        };
        myChart.setOption(option);
        window.onresize = function() {
            resizeWorldMapContainer2();
            myChart.resize()
        };
        /*var worldMapContainer4 = document.getElementById('box4');
        var resizeWorldMapContainer4 = function() {
            worldMapContainer4.style.width = box01_w * 0.96 + 'px';
            worldMapContainer4.style.height = box01_h * 0.35 + 'px'
        };
        resizeWorldMapContainer4();
        var myChart = echarts.init(worldMapContainer4);
        var option = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            textStyle: {
                color: '#ccc'
            },
            legend: {
                x: 'center',
                y: 'bottom',
                textStyle: {
                    color: '#ccc'
                },
                data: res.data.titleList2,
            },
            calculable: true,
            series: [{
                color: ['#7627cb', '#259fd2', '#e26021', '#c7353a', '#f5b91e'],
                name: '资产在贷余额',
                type: 'pie',
                radius: '72%',
                center: ['50%', '45%'],
                data: function() {
                    var serie = [];
                    for (var i = 0; i < res.data.titleList2.length; i++) {
                        var item = {
                            name: res.data.titleList2[i],
                            value: res.data.dataList2[i]
                        };
                        serie.push(item)
                    }
                    return serie
                } ()
            }]
        };
        myChart.setOption(option);
        window.onresize = function() {
            resizeWorldMapContainer4();
            myChart.resize()
        };*/
        var worldMapContainer8 = document.getElementById('box8');
        box8_box = document.getElementById("box8-box");
        box8_box_h = box8_box.offsetHeight;
        box8_box_w = box8_box.offsetWidth;
        var resizeWorldMapContainer8 = function() {
            worldMapContainer8.style.width = box8_box_w * 0.96 + 'px';
            worldMapContainer8.style.height = box8_box_h * 0.87 + 'px'
        };
        resizeWorldMapContainer8();
        var myChart = echarts.init(worldMapContainer8);
        var option = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c}%"
            },
            legend: {
                data: res.data.titleList6,
                x: 'center',
                y: 'bottom',
                textStyle: {
                    color: '#ccc'
                }
            },
            calculable: true,
            series: [{
                name: '所贷金额用途',
                type: 'funnel',
                left: '10%',
                top: '5%',
                bottom: '17%',
                width: '80%',
                min: 0,
                max: 100,
                minSize: '0%',
                maxSize: '100%',
                sort: 'descending',
                gap: 2,
                label: {
                    normal: {
                        show: true,
                        position: 'inside'
                    },
                    emphasis: {
                        textStyle: {
                            fontSize: 24
                        }
                    }
                },
                labelLine: {
                    normal: {
                        length: 10,
                        lineStyle: {
                            width: 1,
                            type: 'solid'
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        borderColor: '#ccc',
                        borderWidth: 1
                    }
                },
                color: ['#c7353a', '#f5b91e', '#2455d0', '#ff7d4e', '#049cfa'],
                data: function() {
                    var serie = [];
                    for (var i = 0; i < res.data.titleList6.length; i++) {
                        var item = {
                            name: res.data.titleList6[i],
                            value: res.data.dataList6[i]
                        };
                        serie.push(item)
                    }
                    return serie
                } ()
            }]
        };
        myChart.setOption(option);
        window.onresize = function() {
            resizeWorldMapContainer8();
            myChart.resize()
        };
        var worldMapContainer = document.getElementById('box3');
        box03 = document.getElementById("box03");
        box03_h = box03.offsetHeight;
        box03_w = box04.offsetWidth;
        var resizeWorldMapContainer = function() {
            worldMapContainer.style.width = box03_w * 1 + 'px';
            worldMapContainer.style.height = box03_h * 0.8 + 'px'
        };
        resizeWorldMapContainer();
        var myChart = echarts.init(worldMapContainer);
        var option = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            grid: {
                height: '40%',
                y: '5%',
                x: '14%'
            },
            legend: {
                x: 'center',
                y: 'bottom',
                textStyle: {
                    color: '#ccc'
                },
                data: res.data.legendList3
            },
            series: [{
                color: ['#7627cb', '#259fd2', '#e26021', '#c7353a', '#f5b91e'],
                name: '资金占比',
                type: 'pie',
                selectedMode: 'single',
                radius: '40%',
                center: ['50%', '40%'],
                label: {
                    normal: {
                        position: 'inner'
                    }
                },
                labelLine: {
                    normal: {
                        show: true
                    }
                },
                data: function() {
                    var serie = [];
                    for (var i = 0; i < res.data.titleList4.length; i++) {
                        var item = {
                            name: res.data.titleList4[i],
                            value: res.data.dataList4[i]
                        };
                        serie.push(item)
                    }
                    return serie
                } ()
            },
            {
                name: '资产占比',
                type: 'pie',
                center: ['50%', '40%'],
                radius: ['50%', '65%'],
                color: ['#d9a503', '#2551bb', '#81b740', '#da70d6', '#ff7f50'],
                data: function() {
                    var serie = [];
                    for (var i = 0; i < res.data.titleList3.length; i++) {
                        var item = {
                            name: res.data.titleList3[i],
                            value: res.data.dataList3[i]
                        };
                        serie.push(item)
                    }
                    return serie
                } ()
            }]
        };
        myChart.setOption(option);
        window.onresize = function() {
            resizeWorldMapContainer();
            myChart.resize()
        };
        var worldMapContainer = document.getElementById('boxes3');
        box03 = document.getElementById("box03");
        box03_h = box03.offsetHeight;
        box03_w = box04.offsetWidth;
        var resizeWorldMapContainer = function() {
            worldMapContainer.style.width = box03_w * 1 + 'px';
            worldMapContainer.style.height = box03_h * 0.8 + 'px'
        };
        resizeWorldMapContainer();
        var myChart = echarts.init(worldMapContainer);
        var option = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            grid: {
                height: '40%',
                y: '5%',
                x: '14%'
            },
            legend: {
                x: 'center',
                y: 'bottom',
                textStyle: {
                    color: '#ccc'
                },
                data: res.data.legendList3
            },
            series: [{
                color: ['#7627cb', '#259fd2', '#e26021', '#c7353a', '#f5b91e'],
                name: '资金占比',
                type: 'pie',
                selectedMode: 'single',
                radius: '40%',
                center: ['50%', '40%'],
                label: {
                    normal: {
                        position: 'inner'
                    }
                },
                labelLine: {
                    normal: {
                        show: true
                    }
                },
                data: function() {
                    var serie = [];
                    for (var i = 0; i < res.data.titleList4.length; i++) {
                        var item = {
                            name: res.data.titleList4[i],
                            value: res.data.dataList42[i]
                        };
                        serie.push(item)
                    }
                    return serie
                } ()
            },
            {
                name: '资产占比',
                type: 'pie',
                center: ['50%', '40%'],
                radius: ['50%', '65%'],
                color: ['#d9a503', '#2551bb', '#81b740', '#da70d6', '#ff7f50'],
                data: function() {
                    var serie = [];
                    for (var i = 0; i < res.data.titleList3.length; i++) {
                        var item = {
                            name: res.data.titleList3[i],
                            value: res.data.dataList32[i]
                        };
                        serie.push(item)
                    }
                    return serie
                } ()
            }]
        };
        myChart.setOption(option);
        window.onresize = function() {
            resizeWorldMapContainer();
            myChart.resize()
        };
        var worldMapContainer5 = document.getElementById('box5');
        box04 = document.getElementById("box04");
        box04_h = box04.offsetHeight;
        box04_w = box04.offsetWidth;
        var resizeWorldMapContainer5 = function() {
            worldMapContainer5.style.width = box04_w * 0.96 + 'px';
            worldMapContainer5.style.height = box04_h * 0.96 + 'px'
        };
        resizeWorldMapContainer5();
        var myChart = echarts.init(worldMapContainer5);
        var option = {
            color: ['#38b5f4', '#ff7d4e'],
            tooltip: {
                trigger: 'axis',
            },
            legend: {
                data: res.data.legendList5,
                textStyle: {
                    color: '#ccc'
                }
            },
            grid: {
                top: '10%',
                left: '3%',
                right: '3%',
                bottom: '6%',
                containLabel: true
            },
            calculable: true,
            textStyle: {
                color: '#ccc'
            },
            xAxis: [{
                type: 'category',
                data: res.data.titleList5,
            }],
            yAxis: [{
                type: 'value'
            }],
            series: function() {
                var serie = [];
                for (var i = 0; i < res.data.legendList5.length; i++) {
                    var item = {
                        name: res.data.legendList5[i],
                        type: 'bar',
                        data: res.data.dataList5[i]
                    };
                    serie.push(item)
                }
                return serie
            } ()
        };
        myChart.setOption(option);
        window.onresize = function() {
            resizeWorldMapContainer5();
            myChart.resize()
        };
        var worldMapContainer1 = document.getElementById('box1');
        box02 = document.getElementById("box02");
        box02_h = box02.offsetHeight;
        box02_w = box02.offsetWidth;
        var resizeWorldMapContainer1 = function() {
            worldMapContainer1.style.width = box02_w * 0.9 + 'px';
            worldMapContainer1.style.height = box02_h * 0.82 + 'px'
        };
        resizeWorldMapContainer1();
        var myChart = echarts.init(worldMapContainer1);
        function randomData() {
            return Math.round(Math.random() * 3000)
        }
        var option = {
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                x: 'left',
                y: 'bottom',
                data: ['数据1', '数据2', '数据3'],
                textStyle: {
                    color: '#ccc'
                }
            },
            visualMap: {
                min: 0,
                max: 2500,
                left: 'right',
                top: 'bottom',
                text: ['高', '低'],
                calculable: true,
                textStyle: {
                    color: '#fff'
                }
            },
            series: [{
                name: '数据1',
                type: 'map',
                aspectScale: 0.75,
                zoom: 1.2,
                mapType: 'china',
                roam: false,
                label: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: false
                    }
                },
                data: function() {
                    var serie = [];
                    for (var i = 0; i < res.data.titleList7.length; i++) {
                        var item = {
                            name: res.data.titleList7[i],
                            value: randomData()
                        };
                        serie.push(item)
                    }
                    return serie
                } ()
            },
            {
                name: '数据2',
                type: 'map',
                mapType: 'china',
                label: {
                    normal: {
                        show: true
                    },
                    emphasis: {
                        show: true
                    }
                },
                data: function() {
                    var serie = [];
                    for (var i = 0; i < res.data.titleList8.length; i++) {
                        var item = {
                            name: res.data.titleList8[i],
                            value: randomData()
                        };
                        serie.push(item)
                    }
                    return serie
                } ()
            },
            {
                name: '数据3',
                type: 'map',
                mapType: 'china',
                label: {
                    normal: {
                        show: true
                    },
                    emphasis: {
                        show: true
                    }
                },
                data: function() {
                    var serie = [];
                    for (var i = 0; i < res.data.titleList9.length; i++) {
                        var item = {
                            name: res.data.titleList9[i],
                            value: randomData()
                        };
                        serie.push(item)
                    }
                    return serie
                } ()
            }]
        };
        myChart.setOption(option);
        window.onresize = function() {
            resizeWorldMapContainer1();
            myChart.resize()
        }
    })
});