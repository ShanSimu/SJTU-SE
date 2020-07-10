const app = getApp()

// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    books:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (!app.globalData.userLogged){
      wx.navigateTo({
        url: '../index/index'
      })
    }else{
      wx.request({
        url: 'http://localhost:8080/getCarts',
        method: "POST",
        data: {
          customer : app.globalData.userId
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'cookie': wx.getStorageSync("sessionid") //cookie
        },
        success(res) {
          console.log("result:");
          console.log(app.globalData.userId);
          console.log(res);
          console.log(res.data);
          that.setData({
            books: res.data
          })
        }
      });
    }
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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  onSubmit: function(){
    var that = this;
    if (!app.globalData.userLogged){
      wx.navigateTo({
        url: '../index/index'
      })
    }else{
      wx.request({
        url: 'http://localhost:8080/deleteAllMobileOrder',
        method: "POST",
        data: {
          customer : app.globalData.userId
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'cookie': wx.getStorageSync("sessionid") //cookie
        },
        success(res) {
          console.log(res);
          that.setData({
            books: []
          })
        }
      });
    }
  }
})