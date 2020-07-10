const app = getApp()
// pages/books/books.js
import Dialog from '@vant/weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    books:[],
    searchValue:"",
    show: false,
    book: null,
    dialogShow : false,
    active:"",
    searchBooks:[]
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
        url: 'http://localhost:8080/getBooks',
        method: "POST",
        // data: {
        //   11:11
        // },
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'cookie': wx.getStorageSync("sessionid") //cookie
        },
        success(res) {
          console.log(res);
          that.setData({
            books: res.data,
            searchBooks:res.data
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
  //底边栏跳转
  onChange(event){
    var that = this;
    this.setData({active : event.detail});
    console.log('../' + this.data.active + '/' + this.data.active);
    wx.navigateTo({
      url: '../' + this.data.active + '/' + this.data.active
    })
  },

  //点击遮罩层
  onClickHide(){
    this.setData({ show:false});
  },

  //点击书籍
  bindViewTap : function(event){
    console.log(event);
    this.setData({
      show : true,
      book : event.currentTarget.dataset.book
    });
  },

  //加入购物车
  onClickButton : function(){
    var that = this;
    wx.request({
      url: 'http://localhost:8080/saveOneCart', 
      method: "POST",
      data: {
        customer : app.globalData.userId,
        book : this.data.book.key
      },
  
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        console.log(res.data);
      }
    }); 
  },

  //进入购物车
  onClickCart(){
    wx.navigateTo({url: "../cart/cart"})
  },

  //打开弹窗
  openDialog:function(){
    Dialog.alert({
      title: 'book details',
      message: this.data.book.details,
    }).then(() => {
      // on close
    });    
    this.setData({
      dialogShow : true,
    })
  },
  onClose() {
    this.setData({ show: false });
  },

  onSearch :function(event){
    this.setData({searchValue:event.detail});
    var needle = this.data.searchValue.toLowerCase();
    if(!needle){
      return;
    }
    var tmpData = this.data.books.filter(function (row) {
        return(row.title.toString().toLowerCase().indexOf(needle) > -1);
    });
    console.log(tmpData);
    this.setData({searchBooks : tmpData});
  },

  onCancel :function(event){
    this.setData({searchBooks:this.data.books});
  },

  bindDetail :function(event){
    let id=event.currentTarget.dataset.book.key;
    console.log(event);
    // console.log(id);
    wx.navigateTo({
      url: '../bookdetail/bookdetail?id='+id,
    })
  }
})