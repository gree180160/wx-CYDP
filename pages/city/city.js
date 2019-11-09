// pages/city/city.js
var townshipJS = require('../../utils/township.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    townships: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
        townships: townshipJS.townshipArr
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },
  cityDetail: function() {
    wx.navigateTo({
      url: '/pages/cityDetail/cityDetail',
    })
  },
  myStore: function() {
    wx.navigateTo({
      url: '/pages/myStore/myStore',
    })
  },
  townShip: function(e) {
    const appInstance = getApp();
    console.log(e);
    var selectTownshipIndex = e.currentTarget.dataset.index;
    appInstance.globalData.selectedTownshipIndex = selectTownshipIndex;
    wx.navigateTo({
      url: '/pages/township/township',
    })

  }
})