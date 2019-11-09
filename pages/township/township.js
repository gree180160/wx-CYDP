// pages/township/township.js
var streetJS = require('../../utils/street.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
      currentTownship: null,
      streets:[1,2]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const appInstace = getApp();
    var townshipModel = streetJS.streetArr[appInstace.globalData.selectedTownshipIndex];
    this.setData({
      currentTownship: townshipModel.townshipName,
      streets: townshipModel.streets,
    })
    wx.setNavigationBarTitle({
      title: townshipModel.townshipName,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  street: function(e) {
    const _this = this;
    const appInstance = getApp();
    var index = e.currentTarget.dataset.index;
    appInstance.globalData.selectedTownshipName = _this.data.currentTownship
    
    var seleectedStreetName = this.data.streets[index].streetName;
    appInstance.globalData.seleectedStreetName = seleectedStreetName;
    appInstance.globalData.seleectedStreetIndex = index;
    wx.navigateTo({
      url: '/pages/street/street',
    })
  },
})