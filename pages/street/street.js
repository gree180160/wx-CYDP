// pages/street/street.js
var wxCharts = require('../../utils/wxcharts.js');
var app = getApp();
var columnChart = null;
var chartData = {
  main: {
    title: '总成交量',
    data: [15, 20, 45, 37],
    categories: ['2012', '2013', '2014', '2015']
  },
};
Page({
  /**
   * 页面的初始数据
   */
  data: {
    chartTitle: '总成交量',
    isMainChartDisplay: true,
    townshipName:null,
    streetName:null,
    columnCharArr:[1,2,3]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const appInstance = getApp();
    var townshipName = appInstance.globalData.selectedTownshipName;
    var streetName = appInstance.globalData.seleectedStreetName;
      this.setData({
        streetName: streetName
      });
      wx.setNavigationBarTitle({
        title: townshipName+'.'+streetName,
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var windowWidth = 350;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    columnChart = new wxCharts({
      canvasId: 'columnCanvas0',
      type: 'column',
      animation: true,
      categories: ['2012', '2013', '2014', '2015'],
      series: [{
        name: '成交量',
        data: chartData.main.data,
        format: function (val, name) {
          return val;
        }
      }],
      yAxis: {
        format: function (val) {
          return val ;
        },
        title: 'hello',
        min: 0
      },
      xAxis: {
        disableGrid: false,
        type: 'calibration'
      },
      extra: {
        column: {
          width: 15
        }
      },
      width: windowWidth,
      height: 200,
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

})