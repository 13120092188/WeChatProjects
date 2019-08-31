//index.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight: 0,
    margin_location: 0,
    margin_model: 0,

    apiUrl: "https://www.tianqiapi.com/api/?version=v1", 
    cityName: "-",
    weatherDatas: [],
    temDiffer: "-",
    air: "-",
    airLevel: "-",
    tem: "-",
    wea: "-",
    weaImg: "-",
    days: [],

    multiArray: [['深圳'], ['今天', '明天', '后天']],
    objectMultiArray: [
      [
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

    hourWeaBox: -1,
    toolBarBox: -1,
    switchBox: 0,

    todayColor: "background-color: #b7b9ba; color:#F4F7F9",
    tomorrowColor: "background-color: #F4F7F9; color:#b7b9ba",
    nextNextColor: "background-color: #F4F7F9; color:#b7b9ba",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getWinHeight();

    this.getCityList();

  },

  //get windows height
  getWinHeight: function() {
    var that = this;
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR;

        var margin_location = (clientHeight - 407) * 0.4;
        var margin_model = (clientHeight - 407) * 0.6;

        console.log(clientWidth)
        console.log(clientHeight)
        console.log(calc)
        that.setData({
          winHeight: calc,
          margin_location: margin_location,
          margin_model: margin_model
        });
      }
    });
  },

  //get citylist
  getCityList: function() {
    var that = this;
    const db = wx.cloud.database()
    db.collection('starCitys')
      .limit(15)
      .get({
        success: res => {
          that.data.objectMultiArray[0] = res.data
          for (var i = 0; i < res.data.length; i++) {
            that.data.multiArray[0][i] = res.data[i].cityZh
          }
          that.setData({
            objectMultiArray: that.data.objectMultiArray
          })
          console.log(that.data.multiArray)
          console.log(res.data)
          that.getWeatherInfo()
          console.log(that.data.multiArray[0])
          console.log('[数据库] [查询记录] 成功: ', res)
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '查询记录失败'
          })
          console.error('[数据库] [查询记录] 失败：', err)
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
    this.getCityList();
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
        cityid: this.data.objectMultiArray[0][this.data.multiIndex[0]].cityId,
        appid: "91628346",
        appsecret: "uwW99XuR"
      },
      success: res => {
        console.log(res.data);
        this.data.weatherDatas = [res.data.data[0], res.data.data[1], res.data.data[2]];
        this.toToday();
      }
    })
  },

  setPageDatas: function() {
    console.log(this.data.weatherDatas[0])

    if (0 == this.data.multiIndex[1]) {
      this.setData({
        cityName: this.data.multiArray[0][this.data.multiIndex[0]],
        air: this.data.weatherDatas[this.data.multiIndex[1]].air,
        airLevel: this.data.weatherDatas[this.data.multiIndex[1]].air_level.slice(0,1),
        tem: this.data.weatherDatas[this.data.multiIndex[1]].tem.slice(0, -1),
        wea: this.data.weatherDatas[this.data.multiIndex[1]].wea,
        weaImg: "../../images/weaIcon/" + this.data.weatherDatas[this.data.multiIndex[1]].wea_img + ".png",
        // weaImg: "cloud://xcx-weather1-nin8f.7863-xcx-weather1-nin8f/weaImg/" + this.data.weatherDatas[this.data.multiIndex[1]].wea_img + ".png",
        days: [this.data.weatherDatas[0].day.slice(-3, -1), this.data.weatherDatas[1].day.slice(0, 3), this.data.weatherDatas[2].day.slice(0, 3)],
        temDiffer: this.data.temDiffer
      })
    } else {
      this.setData({
        cityName: this.data.multiArray[0][this.data.multiIndex[0]],
        air: "",
        airLevel: "",
        tem: this.data.weatherDatas[this.data.multiIndex[1]].tem.slice(0, -1),
        wea: this.data.weatherDatas[this.data.multiIndex[1]].wea,
        weaImg: "../../images/weaIcon/" + this.data.weatherDatas[this.data.multiIndex[1]].wea_img + ".png",
        // weaImg: "cloud://xcx-weather1-nin8f.7863-xcx-weather1-nin8f/weaImg/" + this.data.weatherDatas[this.data.multiIndex[1]].wea_img + ".png",
        days: [this.data.weatherDatas[0].day.slice(-3, -1), this.data.weatherDatas[1].day.slice(0, 3), this.data.weatherDatas[2].day.slice(0, 3)],
        temDiffer: this.data.temDiffer
      });
    }
  },

  toToday: function () {
    this.setData({
      todayColor: "background-color: #b7b9ba; color:#F4F7F9",
      tomorrowColor: "background-color: #F4F7F9; color:#b7b9ba",
      nextNextColor: "background-color: #F4F7F9; color:#b7b9ba",
    });
    this.data.multiIndex[1] = 0;
    this.data.temDiffer = this.data.weatherDatas[0].tem.slice(0, -1) - 27;
    this.setPageDatas();
  },

  toTomorrow: function () {
    this.setData({
      todayColor: "background-color: #F4F7F9; color:#b7b9ba",
      tomorrowColor: "background-color: #b7b9ba; color:#F4F7F9",
      nextNextColor: "background-color: #F4F7F9; color:#b7b9ba",
    });
    this.data.multiIndex[1] = 1;
    this.data.temDiffer = this.data.weatherDatas[1].tem.slice(0, -1) - this.data.weatherDatas[0].tem.slice(0, -1);
    this.setPageDatas();
  },

  toNextNextDay: function () {
    this.setData({
      todayColor: "background-color: #F4F7F9; color:#b7b9ba",
      tomorrowColor: "background-color: #F4F7F9; color:#b7b9ba",
      nextNextColor: "background-color: #b7b9ba; color:#F4F7F9",
    });
    this.data.multiIndex[1] = 2;
    this.data.temDiffer = this.data.weatherDatas[2].tem.slice(0, -1) - this.data.weatherDatas[1].tem.slice(0, -1);
    this.setPageDatas();
  },

  showHours: function() {
    this.data.switchBox = -1;
    this.setData({
      hourWeaBox: 1,
      toolBarBox: -1
    });
  },

  showToolBar: function () {
    this.data.switchBox = 1;
    this.setData({
      toolBarBox: 1,
      hourWeaBox: -1
    });
  },

  hideBox: function () {
    if(this.data.switchBox == -1){
      this.setData({
        hourWeaBox: this.data.hourWeaBox * -1
      });
    } else if (this.data.switchBox == 1) {
      this.setData({
        toolBarBox: this.data.toolBarBox * -1
      });
    }
  },

  unHideBox1: function () {
    this.setData({
      hourWeaBox: this.data.hourWeaBox * -1
    });
  },

  unHideBox2: function () {
    this.setData({
      toolBarBox: this.data.toolBarBox * -1
    });
  },

  changeCity: function(event) {
    console.log(event)
    this.data.multiIndex[0] = event.currentTarget.dataset.cityid;
    this.toToday();
  }
})