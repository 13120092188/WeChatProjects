// miniprogram/pages/addCity/addCity.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cityList: [],
    myCitys: [],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name: 'getCityList',
      data: {
      },
      success: res => {
        // wx.showToast({
        //   title: '调用成功',
        // })
        console.log(res.result.data)
        this.setData({
          cityList: res.result.data
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '调用失败',
        })
        console.error('[云函数] [sum] 调用失败：', err)
      }
    })
    // this.getCityList();
    this.getMyCitys();
  },

  //get citylist
  getCityList: function () {
    var that = this;
    const db = wx.cloud.database()
    db.collection('cityIds')
      .limit(10)
      .get({
        success: res => {
          that.setData({
            cityList: res.data
          })
          console.log(res.data)
          console.log('[数据库] [查询记录] [getCityList] 成功: ', res)
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '查询记录失败'
          })
          console.error('[数据库] [查询记录] [getCityList] 失败：', err)
        }
      })
  },

  //get myCitys
  getMyCitys: function () {
    var that = this;
    const db = wx.cloud.database()
    db.collection('starCitys')
      .limit(15)
      .get({
        success: res => {
          for (var i = 0; i < res.data.length; i++) {
            that.data.myCitys[i] = res.data[i].cityId
          }
          console.log('[数据库] [查询记录] [getMyCitys] 成功: ', res)
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '查询记录失败'
          })
          console.error('[数据库] [查询记录] [getMyCitys] 失败：', err)
        }
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

  addCity: function(event) {
    console.log(event)
    if(this.data.myCitys.indexOf(event.currentTarget.dataset.cityid) == -1 && this.data.myCitys.length < 15){
      var that = this
      const db = wx.cloud.database()
      db.collection('starCitys').add({
        data: {
          id: that.data.myCitys.length,
          cityId: event.currentTarget.dataset.cityid,
          cityZh: event.currentTarget.dataset.cityzh
        },
        success: res => {
          that.getMyCitys();
          wx.showToast({
            title: '新增记录成功',
          })
          console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '新增记录失败'
          })
          console.error('[数据库] [新增记录] 失败：', err)
        }
      })
    } else if (this.data.myCitys.length >= 15){
      wx.showToast({
        icon: 'none',
        title: '最多添加15城市'
      })
    }
  }
})