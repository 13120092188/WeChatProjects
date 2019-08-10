// miniprogram/pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    apiUrl: "https://www.tianqiapi.com/api/?version=v1",

    multiArray: [['深圳', '北京', '上海', '广州'], ['今天', '明天', '后天']],
    objectMultiArray: [
      [
        {
          id: 0,
          name: '深圳',
          cityId: "101280601"
        },
        {
          id: 1,
          name: '北京',
          cityId: "101010100"
        },
        {
          id: 2,
          name: '上海',
          cityId: "101020100"
        },
        {
          id: 3,
          name: '广州',
          cityId: "101280101"
        }
      ], [
        {
          id: 0,
          name: '今天'
        },
        {
          id: 1,
          name: '明天'
        },
        {
          id: 2,
          name: '后天'
        }
      ]
    ],
    multiIndex: [0, 0],

    air: "-",
    airLevel: "-",
    airTips: "-",
    tem: "-",
    tem1: "-",
    tem2: "",
    wea: "-",
    weaImg: "-",
    win: "-",
    winSpeed: "-"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getWeatherInfo()
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

  //获取天气数据
  getWeatherInfo: function () {
    wx.request({
      url: this.data.apiUrl,
      data: {
        cityid: this.data.objectMultiArray[0][this.data.multiIndex[0]].cityId
      },
      success: res => {
        console.log(res.data)
        console.log(res.data.data[this.data.multiIndex[1]])
        if (0 == this.data.multiIndex[1]){
          this.setData({
            air: res.data.data[this.data.multiIndex[1]].air,
            airLevel: res.data.data[this.data.multiIndex[1]].air_level,
            airTips: res.data.data[this.data.multiIndex[1]].air_tips,
            tem: res.data.data[this.data.multiIndex[1]].tem,
            tem1: res.data.data[this.data.multiIndex[1]].tem1,
            tem2: res.data.data[this.data.multiIndex[1]].tem2,
            wea: res.data.data[this.data.multiIndex[1]].wea,
            weaImg: "cloud://id-weather.6964-id-weather/weatherIcon/" + res.data.data[this.data.multiIndex[1]].wea_img + ".png",
            win: res.data.data[this.data.multiIndex[1]].win,
            winSpeed: res.data.data[this.data.multiIndex[1]].win_speed
          })
        }else{
          this.setData({
            air: "",
            airLevel: "",
            airTips: "",
            tem: res.data.data[this.data.multiIndex[1]].tem,
            tem1: res.data.data[this.data.multiIndex[1]].tem1,
            tem2: res.data.data[this.data.multiIndex[1]].tem2,
            wea: res.data.data[this.data.multiIndex[1]].wea,
            weaImg: "cloud://id-weather.6964-id-weather/weatherIcon/" + res.data.data[this.data.multiIndex[1]].wea_img + ".png",
            win: res.data.data[this.data.multiIndex[1]].win,
            winSpeed: res.data.data[this.data.multiIndex[1]].win_speed
          })
        }
        
      }
    })
  },

  //选择器确认函数
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
    this.getWeatherInfo()
  },
  bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    console.log(data.multiIndex);
    this.setData(data);
  }
})